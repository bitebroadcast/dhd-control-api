import { z } from 'zod';

import type { DHDGetHandlers } from '@/types';

import { numberedObject } from '@/utils';

const audioLoudnessImmutable = z.object({
  _leveli: z.number(),
  _levelm: z.number(),
  _levelo: z.number(),
  _levels: z.number(),
  _levelu: z.number(),
  _maxm: z.number(),
  _maxpeak: z.number(),
  _maxs: z.number(),
  _mode: z.string(), // TODO: Request modes and change to enum
  _name: z.string(),
  _peak: z.number(),
});

export const audioLoudness = audioLoudnessImmutable;

export const audioLoudnessGetHandlers = {
  ['/audio/loudness']: {
    paramsSchema: null,
    responseSchema: numberedObject(audioLoudness),
  },
  ['/audio/loudness/{levelDetectID}']: {
    paramsSchema: z.object({
      levelDetectID: z.number(),
    }),
    responseSchema: audioLoudness,
  },
} satisfies DHDGetHandlers;
