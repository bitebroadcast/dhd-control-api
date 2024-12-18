import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';

const audioMixersFadersFaderParamsParamLimiterImmutable = z.object({
  _active: z.boolean(),
  _gainreduction: z.number(),
});

const audioMixersFadersFaderParamsParamLimiterMutable = z.object({
  on: z.boolean(),
  release: z.number(),
  threshold: z.number(),
});

export const audioMixersFadersFaderParamsParamLimiter =
  audioMixersFadersFaderParamsParamLimiterImmutable.merge(
    audioMixersFadersFaderParamsParamLimiterMutable,
  );

export const audioMixersFadersFaderParamsParamLimiterGetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/params/limiter']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    responseSchema: audioMixersFadersFaderParamsParamLimiter,
  },
} satisfies DHDGetHandlers;

export const audioMixersFadersFaderParamsParamLimiterSetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/params/limiter']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    payloadSchema: audioMixersFadersFaderParamsParamLimiterMutable,
    responseSchema: audioMixersFadersFaderParamsParamLimiterMutable,
  },
} satisfies DHDSetHandlers;
