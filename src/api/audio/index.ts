import type { DHDGetHandlers, DHDSetHandlers } from '@/types';

import { audioLevelsGetHandlers } from './levels';
import { audioLoudnessGetHandlers } from './loudness';
import { audioMixersGetHandlers, audioMixersSetHandlers } from './mixers';
import { audioPotsGetHandlers, audioPotsSetHandlers } from './pots';
import { audioRoutingGetHandlers, audioRoutingSetHandlers } from './routing';
import {
  audioSelectorsGetHandlers,
  audioSelectorsSetHandlers,
} from './selectors';

export const audioGetHandlers = {
  ...audioLevelsGetHandlers,
  ...audioLoudnessGetHandlers,
  ...audioMixersGetHandlers,
  ...audioPotsGetHandlers,
  ...audioRoutingGetHandlers,
  ...audioSelectorsGetHandlers,
} satisfies DHDGetHandlers;

export const audioSetHandlers = {
  ...audioMixersSetHandlers,
  ...audioPotsSetHandlers,
  ...audioRoutingSetHandlers,
  ...audioSelectorsSetHandlers,
} satisfies DHDSetHandlers;
