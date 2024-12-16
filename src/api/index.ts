import type { DHDGetHandlers, DHDSetHandlers } from '../types';

import { audioGetHandlers, audioSetHandlers } from './audio';
import { generalGetHandlers } from './general';

// GET handlers

export const dhdHandlers = {
  get: {
    ...audioGetHandlers,
    ...generalGetHandlers,
  },
  set: {
    ...audioSetHandlers,
  },
} satisfies {
  get: DHDGetHandlers;
  set: DHDSetHandlers;
};

export type DHDHandlers = typeof dhdHandlers;
