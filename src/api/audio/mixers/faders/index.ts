import { z } from 'zod';

import type { DHDGetHandlers, DHDSetHandlers } from '@/types';
import { numberedObject } from '@/utils';

import { audioMixersFadersFaderMeters } from './meters';
import {
  audioMixersFadersFaderMutegroupsGetHandlers,
  audioMixersFadersFaderMutegroupsMutegroup,
  audioMixersFadersFaderMutegroupsSetHandlers,
} from './mutegroups';
import { audioMixersFadersFaderOptions } from './options';
import { audioMixersFadersFaderParamlist } from './paramlist';
import {
  audioMixersFadersFaderParamsGetHandlers,
  audioMixersFadersFaderParamsParams,
  audioMixersFadersFaderParamsSetHandlers,
} from './params';

const audioMixersFadersFaderImmutable = z.object({
  _channelcnt: z.number(),
  _defaultlabel: z.string(),
  _faderstart: z.boolean(),
  _lastloadedsnap: z.string(),
  _poolavailable: z.boolean(),
  _readystate: z.boolean(),
  _usecleanfeed: z.number(),
  meter: audioMixersFadersFaderMeters,
  _paramlist: audioMixersFadersFaderParamlist,
  options: audioMixersFadersFaderOptions,
  params: audioMixersFadersFaderParamsParams,
});

const audioMixersFadersFaderMutable = z.object({
  altinput: z.boolean(),
  bypass: z.boolean(),
  fader: z.number(),
  isolate: z.boolean(),
  label: z.string(),
  memo: z.boolean(),
  offair: z.boolean(),
  on: z.boolean(),
  pfl1: z.boolean(),
  pfl2: z.boolean(),
  preparation: z.boolean(),
  solo: z.boolean(),
  sourceid: z.number(),
  vcagroup: z.number(),
  voice: z.boolean(),
  mutegroups: numberedObject(audioMixersFadersFaderMutegroupsMutegroup),
});

export const audioMixersFadersFader = audioMixersFadersFaderImmutable.merge(
  audioMixersFadersFaderMutable,
);

export const audioMixersFadersFaderGetHandlers = {
  ['/audio/mixers/{mixerID}/faders']: {
    paramsSchema: z.object({
      mixerID: z.number(),
    }),
    responseSchema: numberedObject(audioMixersFadersFader),
  },
  ['/audio/mixers/{mixerID}/faders/{faderID}']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    responseSchema: audioMixersFadersFader,
  },
  ...audioMixersFadersFaderMutegroupsGetHandlers,
  ...audioMixersFadersFaderParamsGetHandlers,
} satisfies DHDGetHandlers;

export const audioMixersFadersFaderSetHandlers = {
  ['/audio/mixers/{mixerID}/faders/{faderID}']: {
    paramsSchema: z.object({
      mixerID: z.number(),
      faderID: z.number(),
    }),
    payloadSchema: audioMixersFadersFaderMutable,
    responseSchema: audioMixersFadersFaderMutable,
  },
  ...audioMixersFadersFaderMutegroupsSetHandlers,
  ...audioMixersFadersFaderParamsSetHandlers,
} satisfies DHDSetHandlers;
