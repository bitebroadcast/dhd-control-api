import { z } from 'zod';

import type { DHDGetHandlers } from '@/types';

const audioMixersSourcelistItemImmutable = z.object({
  _defaultlabel: z.string(),
  _label: z.string(),
  _sourceid: z.number(),
});

const audioMixersSourcelistItem = audioMixersSourcelistItemImmutable;

export const audioMixersSourcelist = z.array(audioMixersSourcelistItem);

export const audioMixersSourcelistGetHandlers = {
  ['/audio/mixers/{mixerID}/sourcelist']: {
    paramsSchema: z.object({
      mixerID: z.number(),
    }),
    responseSchema: audioMixersSourcelist,
  },
} satisfies DHDGetHandlers;
