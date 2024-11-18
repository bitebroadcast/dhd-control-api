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

export type DHDGetQuery = {
  method: 'get';
  path: string;
};

export type DHDSetQuery = {
  method: 'set';
  path: string;
  payload: DHDPayload;
};

export type DHDAuthQuery = {
  method: 'auth';
  token: string;
};

export type DHDWebSocketQuery = DHDGetQuery | DHDSetQuery | DHDAuthQuery;

export type DHDRESTQuery = (DHDGetQuery | DHDSetQuery) & {
  token: string;
};

export type ResponseHandler = (response: any) => void;

export type EventHandler = (...args: any[]) => void;
