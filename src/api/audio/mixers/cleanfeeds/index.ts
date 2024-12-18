import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';
import { numberedObject } from '@/utils';

const audioMixersCleanfeedsImmutable = z.object({
  _active: z.boolean(),
});

const audioMixersCleanfeedsMutable = z.object({
  cut: z.boolean(),
  n: z.boolean(),
  outgain: z.number(),
  outsel: z.boolean(),
  srcsel: z.number(),
});

export const audioMixersCleanfeeds = audioMixersCleanfeedsImmutable.merge(
  audioMixersCleanfeedsMutable,
);

export const audioMixersCleanfeedsGetHandlers = {
  ['/audio/mixers/{mixerID}/cleanfeeds']: {
    paramsSchema: null,
    responseSchema: numberedObject(audioMixersCleanfeeds),
  },
  ['/audio/mixers/{mixerID}/cleanfeeds/{cleanfeedID}']: {
    paramsSchema: z.object({
      cleanfeedID: z.number(),
    }),
    responseSchema: audioMixersCleanfeeds,
  },
} satisfies DHDGetHandlers;

export const audioMixersCleanfeedsSetHandlers = {
  ['/audio/mixers/{mixerID}/cleanfeeds/{cleanfeedID}']: {
    paramsSchema: z.object({
      cleanfeedID: z.number(),
    }),
    payloadSchema: audioMixersCleanfeedsMutable,
    responseSchema: audioMixersCleanfeedsMutable,
  },
} satisfies DHDSetHandlers;
