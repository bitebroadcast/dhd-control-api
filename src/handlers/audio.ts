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

export const audioSelectorRequest = z.object({
  selectorID: z.number(),
});

export const audioSelectorResponse = z.object({
  _name: z.string(),
  _sourcelist: z.string(),
  left: audioSource,
  right: audioSource,
});

// Handlers

export const audioGetHandlers = {
  ['/audio/levels/{levelDetectID}']: {
    paramsSchema: audioLevelRequest,
    responseSchema: audioLevelResponse,
  },
  ['/audio/selectors/selectors/{selectorID}']: {
    paramsSchema: audioSelectorRequest,
    responseSchema: audioSelectorResponse,
  },
} satisfies DHDGetHandlers;

export const audioSetHandlers = {
  ['/audio/selectors/selectors/{selectorID}/left']: {
    paramsSchema: audioSelectorRequest,
    responseSchema: audioSource,
    payloadSchema: audioSource,
  },
} satisfies DHDSetHandlers;
