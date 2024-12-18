import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';

const audioMixersFadersFaderParamsParamPanbalImmutable = z.object({
  _active: z.boolean(),
});

const audioMixersFadersFaderParamsParamPanbalMutable = z.object({
  divergency: z.number(),
  lfeonly: z.boolean(),
  lfesend: z.number(),
  matrix: z.number(),
  panbal: z.number(),
  rear: z.number(),
});

export const audioMixersFadersFaderParamsParamPanbal =
  audioMixersFadersFaderParamsParamPanbalImmutable.merge(
    audioMixersFadersFaderParamsParamPanbalMutable,
  );
export const audioMixersFadersFaderParamsParamPanbalGetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/params/panbal']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    responseSchema: audioMixersFadersFaderParamsParamPanbal,
  },
} satisfies DHDGetHandlers;

export const audioMixersFadersFaderParamsParamPanbalSetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/params/panbal']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    payloadSchema: audioMixersFadersFaderParamsParamPanbalMutable,
    responseSchema: audioMixersFadersFaderParamsParamPanbalMutable,
  },
} satisfies DHDSetHandlers;
