import { z } from 'zod';

const dhdWebSocketAuthResponse = z.object({
  msgID: z.string(),
  method: z.literal('auth'),
  success: z.boolean(),
});

const dhdWebSocketBaseResponse = <Method extends 'get' | 'set'>(
  method: Method,
) =>
  z.object({
    msgID: z.string(),
    method: z.literal(method),
    path: z.string(),
    payload: z.any(),
    success: z.boolean(),
    error: z
      .object({
        code: z.number(),
        message: z.string(),
      })
      .optional(),
  });

export const dhdWebSocketResponse = z.discriminatedUnion('method', [
  dhdWebSocketAuthResponse,
  dhdWebSocketBaseResponse('get'),
  dhdWebSocketBaseResponse('set'),
]);
