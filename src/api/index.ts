import type { DHDGetHandlers, DHDSetHandlers } from '../types';

import { audioGetHandlers, audioSetHandlers } from './audio';

// GET handlers

export const dhdHandlers = {
  get: {
    ...audioGetHandlers,
  },
  set: {
    ...audioSetHandlers,
  },
} satisfies {
  get: DHDGetHandlers;
  set: DHDSetHandlers;
};

export type DHDHandlers = typeof dhdHandlers;
