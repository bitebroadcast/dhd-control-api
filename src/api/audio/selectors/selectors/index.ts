import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';

import { numberedObject } from '@/utils';

const audioSelectorSelectorImmutable = z.object({
  _name: z.string(),
  _sourcelist: z.string(),
});

const audioSelectorSelectorMutable = z.object({
  left: z.string(),
  right: z.string(),
});

export const audioSelectorsSelector = audioSelectorSelectorImmutable.merge(
  audioSelectorSelectorMutable,
);

export const audioSelectorsSelectorsGetHandlers = {
  ['/audio/selectors/selectors']: {
    paramsSchema: null,
    responseSchema: numberedObject(audioSelectorsSelector),
  },
  ['/audio/selectors/selectors/{selectorID}']: {
    paramsSchema: z.object({
      selectorID: z.number(),
    }),
    responseSchema: audioSelectorsSelector,
  },
} satisfies DHDGetHandlers;

export const audioSelectorsSelectorsSetHandlers = {
  ['/audio/selectors/selectors/{selectorID}']: {
    paramsSchema: z.object({
      selectorID: z.number(),
    }),
    responseSchema: audioSelectorSelectorMutable,
    payloadSchema: audioSelectorSelectorMutable,
  },
} satisfies DHDSetHandlers;
