import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';

const audioMixersFadersFaderParamsParamGainAGainImmutable = z.object({
  _max: z.number(),
  _min: z.number(),
  _step: z.number(),
});

const audioMixersFadersFaderParamsParamGainAGainMutable = z.object({
  inc: z.number(),
  value: z.number(),
});

const audioMixersFadersFaderParamsParamGainAGain =
  audioMixersFadersFaderParamsParamGainAGainImmutable.merge(
    audioMixersFadersFaderParamsParamGainAGainMutable,
  );

const audioMixersFadersFaderParamsParamGainImmutable = z.object({
  _active: z.boolean(),
  _hasagain: z.boolean(),
  _hasp48: z.boolean(),
  // TODO: Check if including again in the immutable schema is correct
  // or if it should be extended in the exported schema
  again: audioMixersFadersFaderParamsParamGainAGain,
});

const audioMixersFadersFaderParamsParamGainMutable = z.object({
  dgain: z.number(),
  p48: z.boolean(),
  phase: z.boolean(),
});

export const audioMixersFadersFaderParamsParamGain =
  audioMixersFadersFaderParamsParamGainImmutable.merge(
    audioMixersFadersFaderParamsParamGainMutable,
  );

export const audioMixersFadersFaderParamsParamGainGetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/params/gain']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    responseSchema: audioMixersFadersFaderParamsParamGain,
  },
  ['/audio/mixers/{mixerID}/faders/{faderID}/params/gain/again']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    responseSchema: audioMixersFadersFaderParamsParamGainAGain,
  },
} satisfies DHDGetHandlers;

export const audioMixersFadersFaderParamsParamGainSetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/params/gain']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    payloadSchema: audioMixersFadersFaderParamsParamGainMutable,
    responseSchema: audioMixersFadersFaderParamsParamGainMutable,
  },
  ['/audio/mixers/{mixerID}/faders/{faderID}/params/gain/again']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    payloadSchema: audioMixersFadersFaderParamsParamGainAGainMutable,
    responseSchema: audioMixersFadersFaderParamsParamGainAGainMutable,
  },
} satisfies DHDSetHandlers;
