import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';

const audioMixersFadersFaderParamsParamSwcImmutable = z.object({
  _active: z.boolean(),
});

const audioMixersFadersFaderParamsParamSwcMutable = z.object({
  direction: z.number(),
  type: z.boolean(),
  width: z.number(),
});

export const audioMixersFadersFaderParamsParamSwc =
  audioMixersFadersFaderParamsParamSwcImmutable.merge(
    audioMixersFadersFaderParamsParamSwcMutable,
  );

export const audioMixersFadersFaderParamsParamSwcGetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/params/swc']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    responseSchema: audioMixersFadersFaderParamsParamSwc,
  },
} satisfies DHDGetHandlers;

export const audioMixersFadersFaderParamsParamSwcSetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/params/swc']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    payloadSchema: audioMixersFadersFaderParamsParamSwcMutable,
    responseSchema: audioMixersFadersFaderParamsParamSwcMutable,
  },
} satisfies DHDSetHandlers;
