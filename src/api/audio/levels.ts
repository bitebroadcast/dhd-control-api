import { z } from 'zod';

const audioLevelImmutable = z.object({
  _name: z.string(),
  _mode: z.union([z.literal('PPM'), z.literal('VU'), z.literal('TruePeak')]),
  _left: z.number(),
  _right: z.number(),
  _correlation: z.number(),
});

export const audioLevel = audioLevelImmutable;
