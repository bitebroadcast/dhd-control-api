import { z } from 'zod';

const dhdWebSocketAuthResponse = z.object({
  msgID: z.string(),
  method: z.literal('auth'),
  success: z.literal(true),
});

const dhdWebSocketBaseResponse = <Method extends 'get' | 'set'>(
  method: Method,
) =>
  z.object({
    msgID: z.string(),
    method: z.literal(method),
    success: z.literal(true),
    path: z.string(),
    payload: z.any(),
  });

const dhdWebSocketErrorResponse = <Method extends 'get' | 'set' | 'auth'>(
  method: Method,
) =>
  z.object({
    msgID: z.string(),
    method: z.literal(method),
    success: z.literal(false),
    error: z.object({
      code: z.number(),
      message: z.string(),
    }),
  });

export const dhdWebSocketResponse = z.union([
  dhdWebSocketAuthResponse,
  dhdWebSocketErrorResponse('auth'),

  dhdWebSocketBaseResponse('get'),
  dhdWebSocketErrorResponse('get'),

  dhdWebSocketBaseResponse('set'),
  dhdWebSocketErrorResponse('set'),
]);
