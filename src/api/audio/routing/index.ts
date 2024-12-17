import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';
import { numberedObject } from '@/utils';

import { audioRoutingInput, audioRoutingInputsGetHandlers } from './inputs';
import { audioRoutingOutput, audioRoutingOutputsGetHandlers } from './outputs';
import {
  audioRoutingRoute,
  audioRoutingRoutesGetHandlers,
  audioRoutingRoutesSetHandlers,
} from './routes';

const audioRouting = z.object({
  inputs: numberedObject(audioRoutingInput),
  outputs: numberedObject(audioRoutingOutput),
  routes: numberedObject(audioRoutingRoute),
});

export const audioRoutingGetHandlers = {
  ['/audio/routing']: {
    paramsSchema: null,
    responseSchema: audioRouting,
  },
  ...audioRoutingInputsGetHandlers,
  ...audioRoutingOutputsGetHandlers,
  ...audioRoutingRoutesGetHandlers,
} satisfies DHDGetHandlers;

export const audioRoutingSetHandlers = {
  ...audioRoutingRoutesSetHandlers,
} satisfies DHDSetHandlers;
