import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';

import {
  audioMixersFadersFaderParamsParamAGC,
  audioMixersFadersFaderParamsParamAGCGetHandlers,
  audioMixersFadersFaderParamsParamAGCSetHandlers,
} from './agc';
import {
  audioMixersFadersFaderParamsParamCompressor,
  audioMixersFadersFaderParamsParamCompressorGetHandlers,
  audioMixersFadersFaderParamsParamCompressorSetHandlers,
} from './compressor';
import {
  audioMixersFadersFaderParamsParamDeesser,
  audioMixersFadersFaderParamsParamDeesser2,
  audioMixersFadersFaderParamsParamDeesserGetHandlers,
  audioMixersFadersFaderParamsParamDeesserSetHandlers,
} from './deesser';
import {
  audioMixersFadersFaderParamsParamEQ,
  audioMixersFadersFaderParamsParamEQGetHandlers,
  audioMixersFadersFaderParamsParamEQSetHandlers,
} from './eq';
import {
  audioMixersFadersFaderParamsParamExpander,
  audioMixersFadersFaderParamsParamExpanderGetHandlers,
  audioMixersFadersFaderParamsParamExpanderSetHandlers,
} from './expander';
import {
  audioMixersFadersFaderParamsParamGain,
  audioMixersFadersFaderParamsParamGainGetHandlers,
  audioMixersFadersFaderParamsParamGainSetHandlers,
} from './gain';
import {
  audioMixersFadersFaderParamsParamGate,
  audioMixersFadersFaderParamsParamGateGetHandlers,
  audioMixersFadersFaderParamsParamGateSetHandlers,
} from './gate';
import {
  audioMixersFadersFaderParamsParamLimiter,
  audioMixersFadersFaderParamsParamLimiterGetHandlers,
  audioMixersFadersFaderParamsParamLimiterSetHandlers,
} from './limiter';
import {
  audioMixersFadersFaderParamsParamPanbal,
  audioMixersFadersFaderParamsParamPanbalGetHandlers,
  audioMixersFadersFaderParamsParamPanbalSetHandlers,
} from './panbal';
import {
  audioMixersFadersFaderParamsParamR128AGC,
  audioMixersFadersFaderParamsParamR128AGCGetHandlers,
  audioMixersFadersFaderParamsParamR128AGCSetHandlers,
} from './r128agc';
import {
  audioMixersFadersFaderParamsParamSubsonic,
  audioMixersFadersFaderParamsParamSubsonicGetHandlers,
  audioMixersFadersFaderParamsParamSubsonicSetHandlers,
} from './subsonic';
import {
  audioMixersFadersFaderParamsParamSwc,
  audioMixersFadersFaderParamsParamSwcGetHandlers,
  audioMixersFadersFaderParamsParamSwcSetHandlers,
} from './swc';
import {
  audioMixersFadersFaderParamsParamVarfilter,
  audioMixersFadersFaderParamsParamVarfilterGetHandlers,
  audioMixersFadersFaderParamsParamVarfilterSetHandlers,
} from './varfilter';

export const audioMixersFadersFaderParamsParams = z.object({
  agc: audioMixersFadersFaderParamsParamAGC,
  compressor: audioMixersFadersFaderParamsParamCompressor,
  deesser: audioMixersFadersFaderParamsParamDeesser,
  deesser2: audioMixersFadersFaderParamsParamDeesser2,
  // TODO: Check if eq is correct, or if it should be eq1, eq2, eq3 and eq4
  eq: audioMixersFadersFaderParamsParamEQ,
  expander: audioMixersFadersFaderParamsParamExpander,
  gain: audioMixersFadersFaderParamsParamGain,
  gate: audioMixersFadersFaderParamsParamGate,
  limiter: audioMixersFadersFaderParamsParamLimiter,
  panbal: audioMixersFadersFaderParamsParamPanbal,
  r128agc: audioMixersFadersFaderParamsParamR128AGC,
  subsonic: audioMixersFadersFaderParamsParamSubsonic,
  swc: audioMixersFadersFaderParamsParamSwc,
  varfilter: audioMixersFadersFaderParamsParamVarfilter,
});

export const audioMixersFadersFaderParamsGetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/params']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    responseSchema: audioMixersFadersFaderParamsParams,
  },
  ...audioMixersFadersFaderParamsParamAGCGetHandlers,
  ...audioMixersFadersFaderParamsParamCompressorGetHandlers,
  ...audioMixersFadersFaderParamsParamDeesserGetHandlers,
  ...audioMixersFadersFaderParamsParamEQGetHandlers,
  ...audioMixersFadersFaderParamsParamExpanderGetHandlers,
  ...audioMixersFadersFaderParamsParamGainGetHandlers,
  ...audioMixersFadersFaderParamsParamGateGetHandlers,
  ...audioMixersFadersFaderParamsParamLimiterGetHandlers,
  ...audioMixersFadersFaderParamsParamPanbalGetHandlers,
  ...audioMixersFadersFaderParamsParamR128AGCGetHandlers,
  ...audioMixersFadersFaderParamsParamSubsonicGetHandlers,
  ...audioMixersFadersFaderParamsParamSwcGetHandlers,
  ...audioMixersFadersFaderParamsParamVarfilterGetHandlers,
} satisfies DHDGetHandlers;

export const audioMixersFadersFaderParamsSetHandlers = {
  ...audioMixersFadersFaderParamsParamAGCSetHandlers,
  ...audioMixersFadersFaderParamsParamCompressorSetHandlers,
  ...audioMixersFadersFaderParamsParamDeesserSetHandlers,
  ...audioMixersFadersFaderParamsParamEQSetHandlers,
  ...audioMixersFadersFaderParamsParamExpanderSetHandlers,
  ...audioMixersFadersFaderParamsParamGainSetHandlers,
  ...audioMixersFadersFaderParamsParamGateSetHandlers,
  ...audioMixersFadersFaderParamsParamLimiterSetHandlers,
  ...audioMixersFadersFaderParamsParamPanbalSetHandlers,
  ...audioMixersFadersFaderParamsParamR128AGCSetHandlers,
  ...audioMixersFadersFaderParamsParamSubsonicSetHandlers,
  ...audioMixersFadersFaderParamsParamSwcSetHandlers,
  ...audioMixersFadersFaderParamsParamVarfilterSetHandlers,
} satisfies DHDSetHandlers;
