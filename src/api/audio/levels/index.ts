import { z } from 'zod';

import type { DHDGetHandlers } from '@/types';

import { numberedObject } from '@/utils';

const audioLevelsImmutable = z.object({
  _name: z.string(),
  _mode: z.union([z.literal('PPM'), z.literal('VU'), z.literal('TruePeak')]),
  _left: z.number(),
  _right: z.number(),
  _correlation: z.number(),
});

export const audioLevels = audioLevelsImmutable;

export const audioLevelsGetHandlers = {
  ['/audio/levels']: {
    paramsSchema: null,
    responseSchema: numberedObject(audioLevels),
  },
  ['/audio/levels/{levelDetectID}']: {
    paramsSchema: z.object({
      levelDetectID: z.number(),
    }),
    responseSchema: audioLevels,
  },
} satisfies DHDGetHandlers;
