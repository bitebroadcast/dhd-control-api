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

const audioMixerAutomix = audioMixersAutomixImmutable.merge(
  audioMixersAutomixMutable,
);

export const audioMixersAutomixGetHandlers = {
  ['/audio/mixers/{mixerID}/automix']: {
    paramsSchema: null,
    responseSchema: numberedObject(audioMixerAutomix),
  },
  ['/audio/mixers/{mixerID}/automix/{automixID}']: {
    paramsSchema: z.object({
      automixID: z.number(),
    }),
    responseSchema: audioMixerAutomix,
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
