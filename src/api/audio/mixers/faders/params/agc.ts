import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';

const audioMixersFadersFaderParamsParamAGCImmutable = z.object({
  _active: z.boolean(),
  _gainreduction: z.number(),
});

const audioMixersFadersFaderParamsParamAGCMutable = z.object({
  freeze: z.boolean(),
  gain: z.number(),
  level: z.number(),
  on: z.boolean(),
  threshold: z.number(),
  velocity: z.number(),
});

export const audioMixersFadersFaderParamsParamAGC =
  audioMixersFadersFaderParamsParamAGCImmutable.merge(
    audioMixersFadersFaderParamsParamAGCMutable,
  );

export const audioMixersFadersFaderParamsParamAGCGetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/params/agc']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    responseSchema: audioMixersFadersFaderParamsParamAGC,
  },
} satisfies DHDGetHandlers;

export const audioMixersFadersFaderParamsParamAGCSetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/params/agc']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    payloadSchema: audioMixersFadersFaderParamsParamAGCMutable,
    responseSchema: audioMixersFadersFaderParamsParamAGCMutable,
  },
} satisfies DHDSetHandlers;
