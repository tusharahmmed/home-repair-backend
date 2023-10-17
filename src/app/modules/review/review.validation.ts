import { z } from 'zod';

const create = z.object({
  body: z.object({
    review: z.string({ required_error: 'review is required' }),
    rating: z.number({ required_error: 'rating is requird' }).max(5).min(0),
    serviceId: z.string({ required_error: 'service id is requird' }),
    userId: z.string().optional(),
  }),
});

const update = z.object({
  body: z.object({
    review: z.string().optional(),
    rating: z.number().max(5).min(0).optional(),
    serviceId: z.string().optional(),
    userId: z.string().optional(),
  }),
});

export const ReviewValidation = {
  create,
  update,
};
