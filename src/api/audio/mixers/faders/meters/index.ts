import { z } from 'zod';

const audioMixersFadersFaderMeterImmutable = z.object({
  _afl: z.array(z.number()),
  _input: z.array(z.number()),
  _pfl: z.array(z.number()),
});

export const audioMixersFadersFaderMeters =
  audioMixersFadersFaderMeterImmutable;
