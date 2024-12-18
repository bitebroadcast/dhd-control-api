import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';

const audioMixersFadersFaderParamsParamR128AGCImmutable = z.object({
  _active: z.boolean(),
  _gainreduction: z.number(),
});

const audioMixersFadersFaderParamsParamR128AGCMutable = z.object({
  freeze: z.boolean(),
  gain: z.number(),
  level: z.number(),
  on: z.boolean(),
  threshold: z.number(),
  velocity: z.number(),
});

export const audioMixersFadersFaderParamsParamR128AGC =
  audioMixersFadersFaderParamsParamR128AGCImmutable.merge(
    audioMixersFadersFaderParamsParamR128AGCMutable,
  );

export const audioMixersFadersFaderParamsParamR128AGCGetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/params/r128agc']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    responseSchema: audioMixersFadersFaderParamsParamR128AGC,
  },
} satisfies DHDGetHandlers;

export const audioMixersFadersFaderParamsParamR128AGCSetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/params/r128agc']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    payloadSchema: audioMixersFadersFaderParamsParamR128AGCMutable,
    responseSchema: audioMixersFadersFaderParamsParamR128AGCMutable,
  },
} satisfies DHDSetHandlers;
