import type { DHDGetHandlers, DHDSetHandlers } from '@/types';

import { audioGetHandlers, audioSetHandlers } from './audio';
import { controlGetHandlers, controlSetHandlers } from './control';
import { generalGetHandlers } from './general';

// GET handlers

export const dhdHandlers = {
  get: {
    ...audioGetHandlers,
    ...controlGetHandlers,
    ...generalGetHandlers,
  },
  set: {
    ...audioSetHandlers,
    ...controlSetHandlers,
  },
} satisfies {
  get: DHDGetHandlers;
  set: DHDSetHandlers;
};

export type DHDHandlers = typeof dhdHandlers;
