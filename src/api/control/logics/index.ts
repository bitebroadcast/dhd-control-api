import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';
import { numberedObject } from '@/utils';

const controlLogicsLogicImmutable = z.object({
  _name: z.string(),
  _path: z.string(),
});

const controlLogicsLogicMutable = z.object({
  value: z.boolean(),
});

const controlLogicsLogic = controlLogicsLogicImmutable.merge(
  controlLogicsLogicMutable,
);

export const controlLogicsGetHandlers = {
  ['/control/logics']: {
    paramsSchema: null,
    responseSchema: numberedObject(controlLogicsLogic),
  },
  ['/control/logics/{logicID}']: {
    paramsSchema: z.object({
      logicID: z.number(),
    }),
    responseSchema: controlLogicsLogic,
  },
} satisfies DHDGetHandlers;

export const controlLogicsSetHandlers = {
  ['/control/logics/{logicID}']: {
    paramsSchema: z.object({
      logicID: z.number(),
    }),
    payloadSchema: controlLogicsLogicMutable,
    responseSchema: controlLogicsLogicMutable,
  },
} satisfies DHDSetHandlers;
