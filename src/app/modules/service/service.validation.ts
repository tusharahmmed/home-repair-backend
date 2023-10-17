import { z } from 'zod';

const createService = z.object({
  body: z.object({
    data: z.object({
      title: z.string({ required_error: 'title is required' }),
      image: z.string().optional(),
      description: z.string({ required_error: 'description is required' }),
      categoryId: z.string({ required_error: 'categoryId is required' }),
    }),
  }),
});

const updateServie = z.object({
  body: z.object({
    title: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    categoryId: z.string().optional(),
  }),
});

export const ServiceValidation = {
  createService,
  updateServie,
};
