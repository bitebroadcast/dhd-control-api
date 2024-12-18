import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';

const audioMixersFadersFaderParamsParamSubsonicImmutable = z.object({
  _active: z.boolean(),
});

const audioMixersFadersFaderParamsParamSubsonicMutable = z.object({
  frequency: z.number(),
  on: z.boolean(),
});

export const audioMixersFadersFaderParamsParamSubsonic =
  audioMixersFadersFaderParamsParamSubsonicImmutable.merge(
    audioMixersFadersFaderParamsParamSubsonicMutable,
  );

export const audioMixersFadersFaderParamsParamSubsonicGetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/params/gate']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    responseSchema: audioMixersFadersFaderParamsParamSubsonic,
  },
} satisfies DHDGetHandlers;

export const audioMixersFadersFaderParamsParamSubsonicSetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/params/gate']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    payloadSchema: audioMixersFadersFaderParamsParamSubsonicMutable,
    responseSchema: audioMixersFadersFaderParamsParamSubsonicMutable,
  },
} satisfies DHDSetHandlers;
