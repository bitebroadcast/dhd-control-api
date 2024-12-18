import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';

const audioMixersFadersFaderParamsParamDeesserImmutable = z.object({
  _active: z.boolean(),
});

const audioMixersFadersFaderParamsParamDeesserMutable = z.object({
  bandwidth: z.number(),
  on: z.boolean(),
  ratio: z.number(),
  sharpness: z.number(),
});

export const audioMixersFadersFaderParamsParamDeesser =
  audioMixersFadersFaderParamsParamDeesserImmutable.merge(
    audioMixersFadersFaderParamsParamDeesserMutable,
  );

const audioMixersFadersFaderParamsParamDeesser2Immutable = z.object({
  _active: z.boolean(),
  _gainreduction: z.number(),
});

const audioMixersFadersFaderParamsParamDeesser2Mutable = z.object({
  frequency: z.number(),
  on: z.boolean(),
  threshold: z.number(),
});

export const audioMixersFadersFaderParamsParamDeesser2 =
  audioMixersFadersFaderParamsParamDeesser2Immutable.merge(
    audioMixersFadersFaderParamsParamDeesser2Mutable,
  );

export const audioMixersFadersFaderParamsParamDeesserGetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/params/deesser']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    responseSchema: audioMixersFadersFaderParamsParamDeesser,
  },
  ['/audio/mixers/{mixerID}/faders/{faderID}/params/deesser2']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    responseSchema: audioMixersFadersFaderParamsParamDeesser2,
  },
} satisfies DHDGetHandlers;

export const audioMixersFadersFaderParamsParamDeesserSetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/params/deesser']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    payloadSchema: audioMixersFadersFaderParamsParamDeesserMutable,
    responseSchema: audioMixersFadersFaderParamsParamDeesserMutable,
  },
  ['/audio/mixers/{mixerID}/faders/{faderID}/params/deesser2']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    payloadSchema: audioMixersFadersFaderParamsParamDeesser2Mutable,
    responseSchema: audioMixersFadersFaderParamsParamDeesser2Mutable,
  },
} satisfies DHDSetHandlers;
