import type { DHDGetHandlers, DHDSetHandlers } from '@/types';

import { audioLevelsGetHandlers } from './levels';
import { audioLoudnessGetHandlers } from './loudness';
import {
  audioSelectorsGetHandlers,
  audioSelectorsSetHandlers,
} from './selectors';

export const audioGetHandlers = {
  ...audioLevelsGetHandlers,
  ...audioLoudnessGetHandlers,
  ...audioSelectorsGetHandlers,
} satisfies DHDGetHandlers;

export const audioSetHandlers = {
  ...audioSelectorsSetHandlers,
} satisfies DHDSetHandlers;
