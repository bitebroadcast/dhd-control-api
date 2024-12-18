import type { DHDGetHandlers, DHDSetHandlers } from '@/types';

import { controlLogicsGetHandlers, controlLogicsSetHandlers } from './logics';

export const controlGetHandlers = {
  ...controlLogicsGetHandlers,
} satisfies DHDGetHandlers;

export const controlSetHandlers = {
  ...controlLogicsSetHandlers,
} satisfies DHDSetHandlers;
