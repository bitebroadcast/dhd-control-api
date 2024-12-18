import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';

const audioMixersOptionsPflMutable = z.object({
  afl: z.boolean(),
  aflwhenon: z.boolean(),
  mix: z.boolean(),
  reset: z.boolean(),
  resetfader: z.boolean(),
  return: z.boolean(),
});

const audioMixersOptionsPfl = audioMixersOptionsPflMutable;

const audioMixersOptionsImmutable = z.object({
  pfl1: audioMixersOptionsPfl,
  pfl2: audioMixersOptionsPfl,
});

const audioMixersOptionsMutable = z.object({
  directoffair: z.boolean(),
});

export const audioMixersOptions = audioMixersOptionsImmutable.merge(
  audioMixersOptionsMutable,
);

export const audioMixersOptionsGetHandlers = {
  ['/audio/mixers/{mixerID}/options']: {
    paramsSchema: z.object({
      mixerID: z.number(),
    }),
    responseSchema: audioMixersOptions,
  },
  ['/audio/mixers/{mixerID}/options/pfl1']: {
    paramsSchema: z.object({
      mixerID: z.number(),
    }),
    responseSchema: audioMixersOptionsPfl,
  },
  ['/audio/mixers/{mixerID}/options/pfl2']: {
    paramsSchema: z.object({
      mixerID: z.number(),
    }),
    responseSchema: audioMixersOptionsPfl,
  },
} satisfies DHDGetHandlers;

export const audioMixersOptionsSetHandlers = {
  ['/audio/mixers/{mixerID}/options']: {
    paramsSchema: z.object({
      mixerID: z.number(),
    }),
    payloadSchema: audioMixersOptionsMutable,
    responseSchema: audioMixersOptionsMutable,
  },
  ['/audio/mixers/{mixerID}/options/pfl1']: {
    paramsSchema: z.object({
      mixerID: z.number(),
    }),
    payloadSchema: audioMixersOptionsPflMutable,
    responseSchema: audioMixersOptionsPflMutable,
  },
  ['/audio/mixers/{mixerID}/options/pfl2']: {
    paramsSchema: z.object({
      mixerID: z.number(),
    }),
    payloadSchema: audioMixersOptionsPflMutable,
    responseSchema: audioMixersOptionsPflMutable,
  },
} satisfies DHDSetHandlers;
