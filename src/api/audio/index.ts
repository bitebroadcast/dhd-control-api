import type { DHDGetHandlers, DHDSetHandlers } from '@/types';

import { audioLevelsGetHandlers } from './levels';
import { audioLoudnessGetHandlers } from './loudness';
import { audioRoutingGetHandlers, audioRoutingSetHandlers } from './routing';
import {
  audioSelectorsGetHandlers,
  audioSelectorsSetHandlers,
} from './selectors';

export const audioGetHandlers = {
  ...audioLevelsGetHandlers,
  ...audioLoudnessGetHandlers,
  ...audioRoutingGetHandlers,
  ...audioSelectorsGetHandlers,
} satisfies DHDGetHandlers;

export const audioSetHandlers = {
  ...audioRoutingSetHandlers,
  ...audioSelectorsSetHandlers,
} satisfies DHDSetHandlers;
