import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';
import { numberedObject } from '@/utils';

const audioMixersAutomixImmutable = z.object({
  _active: z.boolean(),
});

const audioMixersAutomixMutable = z.object({
  maxattenuation: z.number(),
  passiveattenuation: z.number(),
  hold: z.number(),
  ratio: z.number(),
  release: z.number(),
});

export const audioMixersAutomix = audioMixersAutomixImmutable.merge(
  audioMixersAutomixMutable,
);

export const audioMixersAutomixGetHandlers = {
  ['/audio/mixers/{mixerID}/automix']: {
    // TODO: Add paramsSchema and check all other paramsSchemas in the library
    paramsSchema: null,
    responseSchema: numberedObject(audioMixersAutomix),
  },
  ['/audio/mixers/{mixerID}/automix/{automixID}']: {
    paramsSchema: z.object({
      automixID: z.number(),
    }),
    responseSchema: audioMixersAutomix,
  },
} satisfies DHDGetHandlers;

export const audioMixersAutomixSetHandlers = {
  ['/audio/mixers/{mixerID}/automix/{automixID}']: {
    paramsSchema: z.object({
      automixID: z.number(),
    }),
    payloadSchema: audioMixersAutomixMutable,
    responseSchema: audioMixersAutomixMutable,
  },
} satisfies DHDSetHandlers;
