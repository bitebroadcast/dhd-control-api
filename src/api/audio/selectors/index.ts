import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';

const audioSource = z.string();

const audioSelectorImmutable = z.object({
  _name: z.string(),
  _sourcelist: z.string(),
});

export const audioSelectorMutable = z.object({
  left: audioSource,
  right: audioSource,
});

export const audioSelector = audioSelectorImmutable.merge(audioSelectorMutable);

export const audioSelectorsGetHandlers = {
  ['/audio/selectors/selectors/{selectorID}']: {
    paramsSchema: z.object({
      selectorID: z.number(),
    }),
    responseSchema: audioSelector,
  },
} satisfies DHDGetHandlers;

export const audioSelectorsSetHandlers = {
  ['/audio/selectors/selectors/{selectorID}']: {
    paramsSchema: z.object({
      selectorID: z.number(),
    }),
    responseSchema: audioSelectorMutable,
    payloadSchema: audioSelectorMutable,
  },
} satisfies DHDSetHandlers;
