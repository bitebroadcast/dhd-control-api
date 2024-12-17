import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';
import { numberedObject } from '@/utils';

const audioPotsPotImmutable = z.object({
  _max: z.number(),
  _min: z.number(),
  _name: z.string(),
  _step: z.number(),
});

const audioPotsPotMutable = z.object({
  value: z.number(),
});

const audioPotsPot = audioPotsPotImmutable.merge(audioPotsPotMutable);

export const audioPotsGetHandlers = {
  ['/audio/pots']: {
    paramsSchema: null,
    responseSchema: numberedObject(audioPotsPot),
  },
  ['/audio/pots/{potID}']: {
    paramsSchema: z.object({
      potID: z.number(),
    }),
    responseSchema: audioPotsPot,
  },
} satisfies DHDGetHandlers;

export const audioPotsSetHandlers = {
  ['/audio/pots/{potID}']: {
    paramsSchema: z.object({
      potID: z.number(),
    }),
    payloadSchema: audioPotsPotMutable,
    responseSchema: audioPotsPotMutable,
  },
} satisfies DHDSetHandlers;
