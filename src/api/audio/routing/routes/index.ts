import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';
import { numberedObject } from '@/utils';

const audioRoutingRouteMutable = z.string();

export const audioRoutingRoute = audioRoutingRouteMutable;

export const audioRoutingRoutesGetHandlers = {
  ['/audio/routing/routes']: {
    paramsSchema: null,
    responseSchema: numberedObject(audioRoutingRoute),
  },
  ['/audio/routing/routes/{routeID}']: {
    paramsSchema: z.object({
      routeID: z.number(),
    }),
    responseSchema: audioRoutingRoute,
  },
} satisfies DHDGetHandlers;

export const audioRoutingRoutesSetHandlers = {
  ['/audio/routing/routes/{routeID}']: {
    paramsSchema: z.object({
      // TODO: Check if routeID is actually a number.
      routeID: z.number(),
    }),
    responseSchema: audioRoutingRouteMutable,
    payloadSchema: audioRoutingRouteMutable,
  },
} satisfies DHDSetHandlers;
