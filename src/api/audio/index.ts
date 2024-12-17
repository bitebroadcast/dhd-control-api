import type { DHDGetHandlers, DHDSetHandlers } from '@/types';

import { audioLevelsGetHandlers } from './levels';
import {
  audioSelectorsGetHandlers,
  audioSelectorsSetHandlers,
} from './selectors';

export const audioGetHandlers = {
  ...audioLevelsGetHandlers,
  ...audioSelectorsGetHandlers,
} satisfies DHDGetHandlers;

export const audioSetHandlers = {
  ...audioSelectorsSetHandlers,
} satisfies DHDSetHandlers;
