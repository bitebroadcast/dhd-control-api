import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';
import { numberedObject } from '@/utils';

import {
  audioMixersAutomix,
  audioMixersAutomixGetHandlers,
  audioMixersAutomixSetHandlers,
} from './automix';
import {
  audioMixersCleanfeeds,
  audioMixersCleanfeedsGetHandlers,
  audioMixersCleanfeedsSetHandlers,
} from './cleanfeeds';
import {
  audioMixersFadersFader,
  audioMixersFadersFaderGetHandlers,
  audioMixersFadersFaderSetHandlers,
} from './faders';
import {
  audioMixersMutegroupsGetHandlers,
  audioMixersMutegroupsMutegroup,
} from './mutegroups';
import {
  audioMixersOptions,
  audioMixersOptionsGetHandlers,
  audioMixersOptionsSetHandlers,
} from './options';
import {
  audioMixersSourcelist,
  audioMixersSourcelistGetHandlers,
} from './sourcelist';

const audioMixersMixerImmutable = z.object({
  _lastloadedsnap: z.string(),
  automix: numberedObject(audioMixersAutomix),
  cleanfeeds: numberedObject(audioMixersCleanfeeds),
  faders: numberedObject(audioMixersFadersFader),
  mutegroups: numberedObject(audioMixersMutegroupsMutegroup),
  options: audioMixersOptions,
  sourcelist: audioMixersSourcelist,
});

const audioMixersMixer = audioMixersMixerImmutable;

export const audioMixersGetHandlers = {
  ['/audio/mixers']: {
    paramsSchema: null,
    responseSchema: numberedObject(audioMixersMixer),
  },
  ['/audio/mixers/{mixerID}']: {
    paramsSchema: z.object({
      mixerID: z.number(),
    }),
    responseSchema: audioMixersMixer,
  },
  ...audioMixersAutomixGetHandlers,
  ...audioMixersCleanfeedsGetHandlers,
  ...audioMixersFadersFaderGetHandlers,
  ...audioMixersMutegroupsGetHandlers,
  ...audioMixersOptionsGetHandlers,
  ...audioMixersSourcelistGetHandlers,
} satisfies DHDGetHandlers;

export const audioMixersSetHandlers = {
  ...audioMixersAutomixSetHandlers,
  ...audioMixersCleanfeedsSetHandlers,
  ...audioMixersFadersFaderSetHandlers,
  ...audioMixersOptionsSetHandlers,
} satisfies DHDSetHandlers;
