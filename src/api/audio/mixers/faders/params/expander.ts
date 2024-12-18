import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';

const audioMixersFadersFaderParamsParamExpanderImmutable = z.object({
  _active: z.boolean(),
  _gainreduction: z.number(),
});

const audioMixersFadersFaderParamsParamExpanderMutable = z.object({
  attack: z.number(),
  gain: z.number(),
  on: z.boolean(),
  ratio: z.number(),
  release: z.number(),
  threshold: z.number(),
});

export const audioMixersFadersFaderParamsParamExpander =
  audioMixersFadersFaderParamsParamExpanderImmutable.merge(
    audioMixersFadersFaderParamsParamExpanderMutable,
  );

export const audioMixersFadersFaderParamsParamExpanderGetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/params/expander']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    responseSchema: audioMixersFadersFaderParamsParamExpander,
  },
} satisfies DHDGetHandlers;

export const audioMixersFadersFaderParamsParamExpanderSetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/params/expander']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    payloadSchema: audioMixersFadersFaderParamsParamExpanderMutable,
    responseSchema: audioMixersFadersFaderParamsParamExpanderMutable,
  },
} satisfies DHDSetHandlers;
