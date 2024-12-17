import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';

import { numberedObject } from '@/utils';

import {
  audioSelectorsSelector,
  audioSelectorsSelectorsGetHandlers,
  audioSelectorsSelectorsSetHandlers,
} from './selectors';

const audioSelectors = z.object({
  selectors: numberedObject(audioSelectorsSelector),
  sourcelists: z.any(), // TODO: Implement sourcelists
});

export const audioSelectorsGetHandlers = {
  ['/audio/selectors']: {
    paramsSchema: null,
    responseSchema: audioSelectors,
  },
  ...audioSelectorsSelectorsGetHandlers,
} satisfies DHDGetHandlers;

export const audioSelectorsSetHandlers = {
  ...audioSelectorsSelectorsSetHandlers,
} satisfies DHDSetHandlers;
