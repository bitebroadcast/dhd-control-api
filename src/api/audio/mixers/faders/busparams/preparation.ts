import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';

const audioMixersFadersFaderBusparamsBusparamPreparationImmutable = z.object({
  _active: z.boolean(),
});

const audioMixersFadersFaderBusparamsBusparamPreparationMutable = z.object({
  gain: z.number(),
});

export const audioMixersFadersFaderBusparamsBusparamPreparation =
  audioMixersFadersFaderBusparamsBusparamPreparationImmutable.merge(
    audioMixersFadersFaderBusparamsBusparamPreparationMutable,
  );

export const audioMixersFadersFaderBusparamsBusparamPreparationGetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/busparams/preparation']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    responseSchema: audioMixersFadersFaderBusparamsBusparamPreparation,
  },
} satisfies DHDGetHandlers;

export const audioMixersFadersFaderBusparamsBusparamPreparationSetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/busparams/preparation']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    payloadSchema: audioMixersFadersFaderBusparamsBusparamPreparationMutable,
    responseSchema: audioMixersFadersFaderBusparamsBusparamPreparationMutable,
  },
} satisfies DHDSetHandlers;
