import type { z } from 'zod';

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
