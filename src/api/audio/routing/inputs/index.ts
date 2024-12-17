import { z } from 'zod';

import type { DHDGetHandlers } from '@/types';

import { numberedObject } from '@/utils';

const audioRoutingInputImmutable = z.object({
  _channels: z.number(),
  _device: z.string(),
  _name: z.string(),
});

export const audioRoutingInput = audioRoutingInputImmutable;

export const audioRoutingInputsGetHandlers = {
  ['/audio/routing/inputs']: {
    paramsSchema: null,
    responseSchema: numberedObject(audioRoutingInput),
  },
  ['/audio/routing/inputs/{inputID}']: {
    paramsSchema: z.object({
      inputID: z.number(),
    }),
    responseSchema: audioRoutingInput,
  },
} satisfies DHDGetHandlers;
