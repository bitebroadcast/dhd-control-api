import { z, type ZodSchema } from 'zod';
import { log } from './log';

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

    this.socket.onmessage = (message) => {
      log.info(message.data);
    };
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
}
