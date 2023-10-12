import { z } from 'zod';

const category = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is required' }),
  }),
});

export const CategoryValidation = {
  category,
};
