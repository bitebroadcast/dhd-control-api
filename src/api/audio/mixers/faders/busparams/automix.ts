import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';

const audioMixersFadersFaderBusparamsBusparamAutomixImmutable = z.object({
  _active: z.boolean(),
  _gainreduction: z.number(),
});

const audioMixersFadersFaderBusparamsBusparamAutomixMutable = z.object({
  group: z.number(),
  on: z.boolean(),
  passive: z.boolean(),
  weight: z.number(),
});

export const audioMixersFadersFaderBusparamsBusparamAutomix =
  audioMixersFadersFaderBusparamsBusparamAutomixImmutable.merge(
    audioMixersFadersFaderBusparamsBusparamAutomixMutable,
  );

export const audioMixersFadersFaderBusparamsBusparamAutomixGetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/busparams/automix']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    responseSchema: audioMixersFadersFaderBusparamsBusparamAutomix,
  },
} satisfies DHDGetHandlers;

export const audioMixersFadersFaderBusparamsBusparamAutomixSetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/busparams/automix']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    payloadSchema: audioMixersFadersFaderBusparamsBusparamAutomixMutable,
    responseSchema: audioMixersFadersFaderBusparamsBusparamAutomixMutable,
  },
} satisfies DHDSetHandlers;
