import { z } from 'zod';

import type { DHDGetHandlers } from '@/types';
import { numberedObject } from '@/utils';

const audioRoutingOutputImmutable = z.object({
  _channels: z.number(),
  _device: z.string(),
  _name: z.string(),
});

export const audioRoutingOutput = audioRoutingOutputImmutable;

export const audioRoutingOutputsGetHandlers = {
  ['/audio/routing/outputs']: {
    paramsSchema: null,
    responseSchema: numberedObject(audioRoutingOutput),
  },
  // TODO: Check if route below is existing. Does not exist in the documentation.
  ['/audio/routing/outputs/{outputID}']: {
    paramsSchema: z.object({
      outputID: z.number(),
    }),
    responseSchema: audioRoutingOutput,
  },
} satisfies DHDGetHandlers;
