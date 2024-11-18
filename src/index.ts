import { z, type ZodSchema } from 'zod';

import { dhdHandlers, type DHDHandlers } from './handlers';

import { log } from './log';
import { assertNever } from './utils';
import type { DHDPayload, DHDRESTQuery } from './types';

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
   * Connect to the DHD device using a secure WebSocket connection.
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

export class DHD {
  private options: DHDOptionsOutput;

  private socket: WebSocket | null = null;

  private reconnectTimeout: NodeJS.Timeout | null = null;

  constructor(options: DHDOptionsInput) {
    this.options = dhdOptionsSchema.parse(options);

    if (this.options.autoConnect !== false) {
      this.connect();
    }
  }

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
    const url = new URL('/api/ws', `${protocol}://${this.options.host}:8080`);

    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      log.info('Connection open');

      this.clearReconnectTimeout();
    };

    this.socket.onclose = (close) => {
      if (close.wasClean) {
        log.info('Connection closed cleanly');
      } else {
        log.error('Connection closed unexpectedly');
      }

      if (this.options.autoReconnect !== false) {
        this.reconnect();
      }
    };

    this.socket.onerror = (error) => {
      log.error('Connection error');
      log.error(error);

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

  private handleMessage = ({ data }: MessageEvent) => {
    try {
      const message = JSON.parse(data);

      console.log(message);
    } catch (error) {
      log.error('Failed to parse message');
      log.error(error);
    }
  };

  public get = async <
    Path extends keyof DHDHandlers['get'],
    Response extends z.infer<DHDHandlers['get'][Path]['responseSchema']>,
  >(
    path: Path,
    {
      params,
    }: {
      params: z.infer<DHDHandlers['get'][Path]['paramsSchema']>;
    },
  ) => {
    const { paramsSchema, responseSchema } = dhdHandlers.get[path];

    return this.dhdRequest({
      path,
      params: paramsSchema.parse(params),
      responseSchema,
    }) as unknown as Response;
  };

  public set = async <
    Path extends keyof DHDHandlers['set'],
    Response extends z.infer<DHDHandlers['set'][Path]['responseSchema']>,
  >(
    path: Path,
    {
      params,
      payload,
    }: {
      params: z.infer<DHDHandlers['set'][Path]['paramsSchema']>;
      payload: z.infer<DHDHandlers['set'][Path]['payloadSchema']>;
    },
  ) => {
    const { paramsSchema, responseSchema, payloadSchema } =
      dhdHandlers.set[path];

    return this.dhdRequest({
      path,
      params: paramsSchema.parse(params),
      responseSchema,
      payload: payloadSchema.parse(payload),
    }) as unknown as Response;
  };

  private dhdRequest = async ({
    path,
    params,
    responseSchema,
    payload,
  }: {
    path: string;
    params: Record<string, string | number | boolean>;
    responseSchema: ZodSchema;
    payload?: DHDPayload;
  }) => {
    let pathWithParams = path;

    for (const [key, value] of Object.entries(params)) {
      pathWithParams = pathWithParams.replace(`{${key}}`, `${value}`);
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
        return responseSchema.parse('response');
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

  private webSocketRequest = async () => {};

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
