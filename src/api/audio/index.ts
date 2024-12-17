import type { DHDGetHandlers, DHDSetHandlers } from '@/types';

import { audioLevelsGetHandlers } from './levels';
import { audioLoudnessGetHandlers } from './loudness';
import { audioPotsGetHandlers, audioPotsSetHandlers } from './pots';
import { audioRoutingGetHandlers, audioRoutingSetHandlers } from './routing';
import {
  audioSelectorsGetHandlers,
  audioSelectorsSetHandlers,
} from './selectors';

export const audioGetHandlers = {
  ...audioLevelsGetHandlers,
  ...audioLoudnessGetHandlers,
  ...audioPotsGetHandlers,
  ...audioRoutingGetHandlers,
  ...audioSelectorsGetHandlers,
} satisfies DHDGetHandlers;

export const audioSetHandlers = {
  ...audioPotsSetHandlers,
  ...audioRoutingSetHandlers,
  ...audioSelectorsSetHandlers,
} satisfies DHDSetHandlers;
