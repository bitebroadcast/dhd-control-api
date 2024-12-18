import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';
import { numberedObject } from '@/utils';

const audioMixersMixerImmutable = z.object({
  _lastloadedsnap: z.string(),
});

const audioMixersMixer = audioMixersMixerImmutable;

export const audioMixersGetHandlers = {
  ['/audio/mixers']: {
    paramsSchema: null,
    responseSchema: numberedObject(audioMixersMixer),
  },
  ['/audio/mixers/{mixerID}']: {
    paramsSchema: z.object({
      mixerID: z.number(),
    }),
    responseSchema: audioMixersMixer,
  },
} satisfies DHDGetHandlers;

export const audioMixersSetHandlers = {} satisfies DHDSetHandlers;
