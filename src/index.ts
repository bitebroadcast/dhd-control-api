import type { ZodSchema } from 'zod';
import { z, ZodBoolean, ZodString } from 'zod';

import type { DHDHandlers } from './api';
import type {
  DHDPayload,
  DHDRESTQuery,
  DHDWebSocketQuery,
  ResponseHandler,
} from './types';
import { dhdHandlers } from './api';
import { log } from './log';
import { dhdWebSocketResponse } from './schemas';
import { assertNever } from './utils';

const dhdOptionsSchema = z.object({
  /**
   * The hostname or IP address of the DHD device.
   *
   * @example 10.0.0.1
   * @example dhd.local
   */
  host: z.string(),

  /**
   * The token used to authenticate with the DHD device.
   */
  token: z.string(),

  /**
   * The type of connection to use when connecting to the DHD device. Please
   * note that the connection via REST has a rate limit of 1 request per second.
   *
   * @default 'websocket'
   */
  connectionType: z
    .union([z.literal('websocket'), z.literal('rest')])
    .default('websocket'),

  /**
   * Connect to the DHD device using a secure WebSocket connection or HTTPS-requests.
   *
   * @default false
   */
  secure: z.boolean().default(false),

  /**
   * Connect to the DHD device automatically when the instance is created.
   *
   * @default true
   */
  autoConnect: z.boolean().default(true),

  /**
   * Automatically reconnect to the DHD device if the connection is lost.
   *
   * @default true
   */
  autoReconnect: z.boolean().default(true),
});

export type DHDOptionsInput = z.input<typeof dhdOptionsSchema>;
export type DHDOptionsOutput = z.infer<typeof dhdOptionsSchema>;

type DHDEvents = {
  connect: () => void;
  disconnect: () => void;
  error: (error: Error) => void;
  reconnect: () => void;
};

export class DHD {
  private options: DHDOptionsOutput;

  private socket: WebSocket | null = null;

  private reconnectTimeout: NodeJS.Timeout | null = null;

  private requestMap: Map<
    string,
    { resolve: ResponseHandler; reject: ResponseHandler }
  > = new Map();

  private eventHandlers: Map<string, DHDEvents[keyof DHDEvents][]> = new Map();

  constructor(options: DHDOptionsInput) {
    this.options = dhdOptionsSchema.parse(options);

    if (this.options.autoConnect !== false) {
      this.connect();
    }
  }

  public on = <Event extends keyof DHDEvents, Handler extends DHDEvents[Event]>(
    event: Event,
    handler: (...args: Parameters<Handler>) => ReturnType<Handler>,
  ) => {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }

    this.eventHandlers.get(event)!.push(handler);
  };

  public off = <
    Event extends keyof DHDEvents,
    Handler extends DHDEvents[Event],
  >(
    event: Event,
    handler: (...args: Parameters<Handler>) => ReturnType<Handler>,
  ) => {
    if (!this.eventHandlers.has(event)) {
      return;
    }

    const eventHandlers = this.eventHandlers.get(event);

    if (eventHandlers) {
      this.eventHandlers.set(
        event,
        eventHandlers.filter((h) => h !== handler),
      );
    }
  };

  private emit = <
    Event extends keyof DHDEvents,
    Handler extends DHDEvents[Event],
  >(
    event: Event,
    ...args: Parameters<Handler>
  ) => {
    const eventHandlers = this.eventHandlers.get(event);

    if (eventHandlers) {
      for (const handler of eventHandlers) {
        (handler as (...args: any[]) => void)(...args);
      }
    }
  };

  /**
   * Connect to the DHD device via WebSocket. This method is called automatically
   * when the instance is created and the `autoConnect` option is not set to `false`.
   * This method does nothing if the `connectionType` option is not set to `websocket`.
   *
   * @returns void
   */
  public connect = () => {
    if (this.options.connectionType !== 'websocket') {
      return;
    }

    this.clearReconnectTimeout();

    if (this.socket) {
      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.close();
      }

      this.socket = null;
    }

    const protocol = this.options.secure ? 'wss' : 'ws';
    const url = new URL('/api/ws', `${protocol}://${this.options.host}`);

    this.socket = new WebSocket(url);

    this.socket.onopen = async () => {
      log.info('Connection open');

      await this.authenticateWebSocket();

      this.emit('connect');

      this.clearReconnectTimeout();
    };

    this.socket.onclose = (close) => {
      if (close.wasClean) {
        log.info('Connection closed cleanly');
      } else {
        log.error('Connection closed unexpectedly');
      }

      this.emit('disconnect');

      if (this.options.autoReconnect !== false) {
        this.reconnect();
      }
    };

    this.socket.onerror = (error) => {
      log.error('Connection error');
      log.error(error);

      this.emit('error', new Error((error as ErrorEvent).message));

      if (this.options.autoReconnect !== false) {
        this.reconnect();
      }
    };

    this.socket.onmessage = this.handleMessage;
  };

  private reconnect = () => {
    if (this.options.autoReconnect !== false) {
      this.reconnectTimeout = setTimeout(() => {
        log.warn('Reconnecting...');

        this.emit('reconnect');

        this.connect();
      }, 1000);
    }
  };

  private clearReconnectTimeout = () => {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
  };

  private authenticateWebSocket = async () => {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      log.error('WebSocket connection is not open');
      return;
    }

    await this.webSocketRequest({
      requestPayload: {
        method: 'auth',
        token: this.options.token,
      },
    });
  };

  private handleMessage = ({ data }: MessageEvent) => {
    try {
      const message = dhdWebSocketResponse.parse(JSON.parse(data));

      switch (message.method) {
        case 'auth':
        case 'get':
        case 'set': {
          if (this.requestMap.has(message.msgID)) {
            const promise = this.requestMap.get(message.msgID);

            if (message.method !== 'auth' && message.success !== true) {
              promise?.reject(
                new Error(message.error?.message ?? 'Unknown error'),
              );
            } else {
              promise?.resolve(message);
            }

            this.requestMap.delete(message.msgID);
          }

          break;
        }

        default: {
          assertNever(message);
          break;
        }
      }
    } catch (error) {
      log.error('Failed to parse message');
      log.error(error);
    }
  };

  /**
   * Get data from the DHD device.
   *
   * @example
   * await dhd.get("/audio/levels/{levelDetectID}", {
   *   params: { levelDetectID: 1 },
   * });
   *
   */
  public get = async <
    Path extends keyof DHDHandlers['get'],
    Response extends z.infer<DHDHandlers['get'][Path]['responseSchema']>,
  >(
    ...[
      path,
      { params } = { params: undefined },
    ]: DHDHandlers['get'][Path]['paramsSchema'] extends z.ZodSchema
      ? [
          path: Path,
          { params: z.infer<DHDHandlers['get'][Path]['paramsSchema']> },
        ]
      : [path: Path]
  ) => {
    const { paramsSchema, responseSchema } = dhdHandlers.get[path];

    return this.dhdRequest({
      path,
      params: paramsSchema?.parse(params),
      responseSchema,
    }) as unknown as Response;
  };

  /**
   * Set data in the DHD device.
   *
   * @example
   * await dhd.set("/audio/selectors/selectors/{selectorID}", {
   *   params: { selectorID: 1 },
   *   payload: { left: "40" },
   * });
   *
   */
  public set = async <
    Path extends keyof DHDHandlers['set'],
    Payload extends Partial<z.infer<DHDHandlers['set'][Path]['payloadSchema']>>,
  >(
    ...[
      path,
      { params, payload },
    ]: DHDHandlers['set'][Path]['paramsSchema'] extends z.ZodSchema
      ? [
          path: Path,
          {
            params: z.infer<DHDHandlers['set'][Path]['paramsSchema']>;
            payload: Payload;
          },
        ]
      : [
          path: Path,
          {
            // TODO: Params should not be visible in object intellisense of set
            // function when paramsSchema is null
            params?: never;
            payload: Payload;
          },
        ]
  ) => {
    const { paramsSchema, responseSchema, payloadSchema } =
      dhdHandlers.set[path];

    return this.dhdRequest({
      path,
      params: paramsSchema?.parse(params),
      // TODO: This is a dirty fix for string payloads. Check if there is
      // a better way to handle this.
      responseSchema:
        responseSchema instanceof ZodString ||
        responseSchema instanceof ZodBoolean
          ? responseSchema.optional()
          : responseSchema.partial(),
      payload: (payloadSchema instanceof ZodString ||
      payloadSchema instanceof ZodBoolean
        ? payloadSchema.optional()
        : payloadSchema.partial()
      ).parse(payload),
    }) as unknown as Payload;
  };

  private dhdRequest = async ({
    path,
    params,
    responseSchema,
    payload,
  }: {
    path: string;
    params?: Record<string, string | number | boolean>;
    responseSchema: ZodSchema;
    payload?: DHDPayload;
  }) => {
    let pathWithParams = path;

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        pathWithParams = pathWithParams.replace(`{${key}}`, `${value}`);
      }
    }

    log.info(`GET ${pathWithParams} via ${this.options.connectionType}`);

    const requestPayload =
      typeof payload === 'undefined'
        ? ({
            method: 'get',
            path: pathWithParams,
          } as const)
        : ({
            method: 'set',
            path: pathWithParams,
            payload,
          } as const);

    switch (this.options.connectionType) {
      case 'websocket': {
        return this.webSocketRequest({ requestPayload });
      }

      case 'rest': {
        const response = await this.fetchRequest({
          requestPayload: {
            ...requestPayload,
            token: this.options.token,
          },
        });

        return responseSchema.parse(response);
      }

      default: {
        return assertNever(this.options.connectionType);
      }
    }
  };

  private generateMsgID = () => {
    return Math.random().toString(35).slice(2, 7);
  };

  private webSocketRequest = async ({
    requestPayload,
  }: {
    requestPayload: DHDWebSocketQuery;
  }) => {
    return new Promise((resolve, reject) => {
      const msgID = this.generateMsgID();

      this.requestMap.set(msgID, { resolve, reject });

      if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
        log.error('WebSocket connection is not open');

        reject(new Error('WebSocket connection is not open'));
      }

      this.socket?.send(JSON.stringify({ msgID, ...requestPayload }));

      setTimeout(() => {
        if (this.requestMap.has(msgID)) {
          this.requestMap.delete(msgID);
          reject(new Error(`Request ${msgID} timed out`));
        }
      }, 5 * 1000);
    });
  };

  private fetchRequest = async ({
    requestPayload,
  }: {
    requestPayload: DHDRESTQuery;
  }) => {
    try {
      const protocol = this.options.secure ? 'https' : 'http';
      const url = new URL(
        `/api/rest`,
        `${protocol}://${this.options.host}:3000`,
      );

      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) {
        // TODO: Handle error and emit via handler
        log.error('Failed to fetch data');
        log.error(response.statusText);

        return;
      }

      const json = await response.json();

      return json;
    } catch (error) {
      log.error('Failed to fetch data');
      log.error(error);
    }
  };
}
