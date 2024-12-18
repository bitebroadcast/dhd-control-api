import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';
import { numberedObject } from '@/utils';

import {
  audioMixersFadersFaderBusparamsBusparamAutomix,
  audioMixersFadersFaderBusparamsBusparamAutomixGetHandlers,
  audioMixersFadersFaderBusparamsBusparamAutomixSetHandlers,
} from './automix';
import {
  audioMixersFadersFaderBusparamsBusparamBus,
  audioMixersFadersFaderBusparamsBusparamBusGetHandlers,
  audioMixersFadersFaderBusparamsBusparamBusSetHandlers,
} from './bus';
import {
  audioMixersFadersFaderBusparamsBusparamPreparation,
  audioMixersFadersFaderBusparamsBusparamPreparationGetHandlers,
  audioMixersFadersFaderBusparamsBusparamPreparationSetHandlers,
} from './preparation';

const audioMixersFadersFaderBusparams = z.object({
  automix: audioMixersFadersFaderBusparamsBusparamAutomix,
  bus: numberedObject(audioMixersFadersFaderBusparamsBusparamBus),
  preparation: audioMixersFadersFaderBusparamsBusparamPreparation,
});

export const audioMixersFadersFaderBusparamsGetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}/busparams']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    responseSchema: audioMixersFadersFaderBusparams,
  },
  ...audioMixersFadersFaderBusparamsBusparamAutomixGetHandlers,
  ...audioMixersFadersFaderBusparamsBusparamBusGetHandlers,
  ...audioMixersFadersFaderBusparamsBusparamPreparationGetHandlers,
} satisfies DHDGetHandlers;

export const audioMixersFadersFaderBusparamsSetHandlers = {
  ...audioMixersFadersFaderBusparamsBusparamAutomixSetHandlers,
  ...audioMixersFadersFaderBusparamsBusparamBusSetHandlers,
  ...audioMixersFadersFaderBusparamsBusparamPreparationSetHandlers,
} satisfies DHDSetHandlers;
