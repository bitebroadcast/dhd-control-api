import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';
import { numberedObject } from '@/utils';

const audioMixersFadersFaderMutegroupsMutegroupMutable = z.boolean();

export const audioMixersFadersFaderMutegroupsMutegroup =
  audioMixersFadersFaderMutegroupsMutegroupMutable;

export const audioMixersFadersFaderMutegroupsGetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/mutegroups']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    responseSchema: numberedObject(audioMixersFadersFaderMutegroupsMutegroup),
  },
  ['/audio/mixers/{mixerID}/faders/{faderID}/mutegroups/{mutegroupID}']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
      mutegroupID: z.number(),
    }),
    responseSchema: audioMixersFadersFaderMutegroupsMutegroup,
  },
} satisfies DHDGetHandlers;

export const audioMixersFadersFaderMutegroupsSetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/mutegroups/{mutegroupID}']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
      mutegroupID: z.number(),
    }),
    payloadSchema: audioMixersFadersFaderMutegroupsMutegroupMutable,
    responseSchema: audioMixersFadersFaderMutegroupsMutegroupMutable,
  },
} satisfies DHDSetHandlers;
