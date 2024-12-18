import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';

const audioMixersFadersFaderParamsParamCompressorImmutable = z.object({
  _active: z.boolean(),
  _gainreduction: z.number(),
});

const audioMixersFadersFaderParamsParamCompressorMutable = z.object({
  attack: z.number(),
  gain: z.number(),
  on: z.boolean(),
  ratio: z.number(),
  release: z.number(),
  threshold: z.number(),
});

export const audioMixersFadersFaderParamsParamCompressor =
  audioMixersFadersFaderParamsParamCompressorImmutable.merge(
    audioMixersFadersFaderParamsParamCompressorMutable,
  );

export const audioMixersFadersFaderParamsParamCompressorGetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/params/compressor']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    responseSchema: audioMixersFadersFaderParamsParamCompressor,
  },
} satisfies DHDGetHandlers;

export const audioMixersFadersFaderParamsParamCompressorSetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/params/compressor']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    payloadSchema: audioMixersFadersFaderParamsParamCompressorMutable,
    responseSchema: audioMixersFadersFaderParamsParamCompressorMutable,
  },
} satisfies DHDSetHandlers;
