import { z } from 'zod';

export const assertNever = (value: never): never => {
  throw new Error(`Unexpected value: ${value}`);
};

export const numberedObject = <Schema extends z.ZodSchema>(schema: Schema) =>
  z.record(z.coerce.number(), schema);
