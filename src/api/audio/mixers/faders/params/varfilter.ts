import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';

const audioMixersFadersFaderParamsParamVarfilterImmutable = z.object({
  _active: z.boolean(),
});

const audioMixersFadersFaderParamsParamVarfilterMutable = z.object({
  frequency: z.number(),
  hipass: z.boolean(),
  on: z.boolean(),
  order: z.number(),
});

export const audioMixersFadersFaderParamsParamVarfilter =
  audioMixersFadersFaderParamsParamVarfilterImmutable.merge(
    audioMixersFadersFaderParamsParamVarfilterMutable,
  );

export const audioMixersFadersFaderParamsParamVarfilterGetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/params/varfilter{filtID}']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
      filtID: z.number(),
    }),
    responseSchema: audioMixersFadersFaderParamsParamVarfilter,
  },
} satisfies DHDGetHandlers;

export const audioMixersFadersFaderParamsParamVarfilterSetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/params/varfilter{filtID}']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
      filtID: z.number(),
    }),
    payloadSchema: audioMixersFadersFaderParamsParamVarfilterMutable,
    responseSchema: audioMixersFadersFaderParamsParamVarfilterMutable,
  },
} satisfies DHDSetHandlers;
