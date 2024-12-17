import { z } from 'zod';

import type { DHDGetHandlers } from '@/types';

import { numberedObject } from '@/utils';

const audioSelectorsSourcelistImmutable = z.object({
  _name: z.string(),
  entries: numberedObject(
    z.object({
      _label: z.string(),
      _sourcel: z.string(),
      _sourcer: z.string(),
    }),
  ),
});

const audioSelectorsSourcelist = audioSelectorsSourcelistImmutable;

export const audioSelectorsSourcelistsGetHandlers = {
  ['/audio/selectors/sourcelists']: {
    paramsSchema: null,
    responseSchema: numberedObject(audioSelectorsSourcelist),
  },
  ['/audio/selectors/sourcelists/{sourcelistID}']: {
    paramsSchema: z.object({
      sourcelistID: z.number(),
    }),
    responseSchema: audioSelectorsSourcelist,
  },
} satisfies DHDGetHandlers;
