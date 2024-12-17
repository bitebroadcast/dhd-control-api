import { z } from 'zod';

import type { DHDGetHandlers } from '@/types';

export const general = z.object({
  _api_version: z.string(),
  _firmware_version: z.string(),
  _hardwareserial: z.string(),
  _hourmeter: z.number(),
  _sync2ok: z.boolean(),
  _syncsource: z.number(),
  _systemfrequency: z.number(),
  _systemtime: z.number(),
  _uptime: z.number(),
});

export const generalGetHandlers = {
  ['/general']: {
    paramsSchema: null,
    responseSchema: general,
  },
} satisfies DHDGetHandlers;
