import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';

const audioMixersFadersFaderParamsParamEQImmutable = z.object({
  _active: z.boolean(),
});

const audioMixersFadersFaderParamsParamEQMutable = z.object({
  frequency: z.number(),
  gain: z.number(),
  on: z.boolean(),
  q: z.number(),
  type: z.number(),
});

export const audioMixersFadersFaderParamsParamEQ =
  audioMixersFadersFaderParamsParamEQImmutable.merge(
    audioMixersFadersFaderParamsParamEQMutable,
  );

export const audioMixersFadersFaderParamsParamEQGetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/params/eq{eqID}']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
      eqID: z.number(),
    }),
    responseSchema: audioMixersFadersFaderParamsParamEQ,
  },
} satisfies DHDGetHandlers;

export const audioMixersFadersFaderParamsParamEQSetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/params/eq{eqID}']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
      eqID: z.number(),
    }),
    payloadSchema: audioMixersFadersFaderParamsParamEQMutable,
    responseSchema: audioMixersFadersFaderParamsParamEQMutable,
  },
} satisfies DHDSetHandlers;
