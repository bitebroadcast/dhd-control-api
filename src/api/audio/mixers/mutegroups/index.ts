import { z } from 'zod';

import type { DHDGetHandlers } from '@/types';
import { numberedObject } from '@/utils';

const audioMixersMutegroupsMutegroupImmutable = z.boolean();

export const audioMixersMutegroupsMutegroup =
  audioMixersMutegroupsMutegroupImmutable;

export const audioMixersMutegroupsGetHandlers = {
  ['/audio/mixers/{mixerID}/mutegroups']: {
    paramsSchema: z.object({
      mixerID: z.number(),
    }),
    responseSchema: numberedObject(audioMixersMutegroupsMutegroup),
  },
  ['/audio/mixers/{mixerID}/mutegroups/{mutegroupID}']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      mutegroupID: z.number(),
    }),
    responseSchema: audioMixersMutegroupsMutegroup,
  },
} satisfies DHDGetHandlers;
