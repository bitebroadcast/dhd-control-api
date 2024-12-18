import { z } from 'zod';

const audioMixersFadersFaderOptionsMutable = z.object({
  autooffair: z.boolean(),
  combilogic0: z.boolean(),
  timerreset: z.boolean(),
});

export const audioMixersFadersFaderOptions =
  audioMixersFadersFaderOptionsMutable;
