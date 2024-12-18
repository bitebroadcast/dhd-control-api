import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';

const audioMixersFadersFaderParamsParamGateImmutable = z.object({
  _active: z.boolean(),
  _gainreduction: z.number(),
});

const audioMixersFadersFaderParamsParamGateMutable = z.object({
  attack: z.number(),
  attenuation: z.number(),
  on: z.boolean(),
  release: z.number(),
  threshold: z.number(),
});

export const audioMixersFadersFaderParamsParamGate =
  audioMixersFadersFaderParamsParamGateImmutable.merge(
    audioMixersFadersFaderParamsParamGateMutable,
  );

export const audioMixersFadersFaderParamsParamGateGetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/params/gate']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    responseSchema: audioMixersFadersFaderParamsParamGate,
  },
} satisfies DHDGetHandlers;

export const audioMixersFadersFaderParamsParamGateSetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/params/gate']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    payloadSchema: audioMixersFadersFaderParamsParamGateMutable,
    responseSchema: audioMixersFadersFaderParamsParamGateMutable,
  },
} satisfies DHDSetHandlers;
