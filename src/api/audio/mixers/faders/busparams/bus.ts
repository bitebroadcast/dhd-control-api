import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';

const audioMixersFadersFaderBusparamsBusparamBusImmutable = z.object({
  _active: z.boolean(),
});

const audioMixersFadersFaderBusparamsBusparamBusMutable = z.object({
  gain: z.number(),
  on: z.boolean(),
  type: z.number(),
});

export const audioMixersFadersFaderBusparamsBusparamBus =
  audioMixersFadersFaderBusparamsBusparamBusImmutable.merge(
    audioMixersFadersFaderBusparamsBusparamBusMutable,
  );

export const audioMixersFadersFaderBusparamsBusparamBusGetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/busparams/bus']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    responseSchema: audioMixersFadersFaderBusparamsBusparamBus,
  },
} satisfies DHDGetHandlers;

export const audioMixersFadersFaderBusparamsBusparamBusSetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/busparams/bus']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    payloadSchema: audioMixersFadersFaderBusparamsBusparamBusMutable,
    responseSchema: audioMixersFadersFaderBusparamsBusparamBusMutable,
  },
} satisfies DHDSetHandlers;
