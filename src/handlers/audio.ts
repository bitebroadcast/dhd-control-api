import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '../types';

// General types

export const audioSource = z.string();

// Requests and responses

export const audioLevelRequest = z.object({
  levelDetectID: z.number(),
});

export const audioLevelResponse = z.object({
  _name: z.string(),
  _mode: z.union([z.literal('PPM'), z.literal('VU'), z.literal('TruePeak')]),
  _left: z.number(),
  _right: z.number(),
  _correlation: z.number(),
});

const audioSelectorImmutable = z.object({
  _name: z.string(),
  _sourcelist: z.string(),
});

const audioSelectorMutable = z.object({
  left: audioSource,
  right: audioSource,
});

const audioSelector = audioSelectorImmutable.merge(audioSelectorMutable);

// Handlers

export const audioGetHandlers = {
  ['/audio/levels/{levelDetectID}']: {
    paramsSchema: audioLevelRequest,
    responseSchema: audioLevelResponse,
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
    responseSchema: audioSelectorMutable.partial(),
    payloadSchema: audioSelectorMutable.partial(),
  },
} satisfies DHDSetHandlers;
