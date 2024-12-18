import { z } from 'zod';

const audioMixersFadersFaderParamlistImmutable = z.array(
  // TODO: Ask for all possible values
  z.enum([
    'subsonic',
    'agc',
    'expander',
    'eq1',
    'eq2',
    'eq3',
    'eq4',
    'deesser2',
    'compressor',
    'limiter',
  ]),
);

export const audioMixersFadersFaderParamlist =
  audioMixersFadersFaderParamlistImmutable;
