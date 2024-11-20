import { z } from 'zod';

const audioSource = z.string();

const audioSelectorImmutable = z.object({
  _name: z.string(),
  _sourcelist: z.string(),
});

export const audioSelectorMutable = z.object({
  left: audioSource,
  right: audioSource,
});

export const audioSelector = audioSelectorImmutable.merge(audioSelectorMutable);
