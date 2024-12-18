import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';
import { numberedObject } from '@/utils';

import {
  audioMixersAutomixGetHandlers,
  audioMixersAutomixSetHandlers,
} from './automix';
import {
  audioMixersCleanfeedsGetHandlers,
  audioMixersCleanfeedsSetHandlers,
} from './cleanfeeds';

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
  ...audioMixersAutomixGetHandlers,
  ...audioMixersCleanfeedsGetHandlers,
} satisfies DHDGetHandlers;

export const audioMixersSetHandlers = {
  ...audioMixersAutomixSetHandlers,
  ...audioMixersCleanfeedsSetHandlers,
} satisfies DHDSetHandlers;
