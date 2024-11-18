import type { z } from 'zod';

export type DHDPrimitive = string | number | boolean;
export type DHDPrimitives = Record<string, DHDPrimitive>;
export type DHDPayload = DHDPrimitive | DHDPrimitives;

type DHDGetHandler = {
  paramsSchema: z.ZodSchema;
  responseSchema: z.ZodSchema;
};

export type DHDGetHandlers = Record<string, DHDGetHandler>;

type DHDSetHandler = {
  paramsSchema: z.ZodSchema;
  responseSchema: z.ZodSchema;
  payloadSchema: z.ZodSchema;
};

export type DHDSetHandlers = Record<string, DHDSetHandler>;

export type DHDRESTQuery =
  | {
      token: string;
      method: 'get';
      path: string;
    }
  | {
      token: string;
      method: 'set';
      path: string;
      payload: DHDPayload;
    };
