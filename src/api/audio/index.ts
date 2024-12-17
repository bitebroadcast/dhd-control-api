import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '../../types';

import { audioLevel } from './levels';
import { audioSelector, audioSelectorMutable } from './selectors';

export const audioGetHandlers = {
  ['/audio/levels/{levelDetectID}']: {
    paramsSchema: z.object({
      levelDetectID: z.number(),
    }),
    responseSchema: audioLevel,
  },
  ['/audio/selectors/selectors/{selectorID}']: {
    paramsSchema: z.object({
      selectorID: z.number(),
    }),
    responseSchema: audioSelector,
  },
} satisfies DHDGetHandlers;

export const audioSetHandlers = {
  ['/audio/selectors/selectors/{selectorID}']: {
    paramsSchema: z.object({
      selectorID: z.number(),
    }),
    responseSchema: audioSelectorMutable,
    payloadSchema: audioSelectorMutable,
  },
} satisfies DHDSetHandlers;
