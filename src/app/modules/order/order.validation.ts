import { z } from 'zod';

const createOrder = z.object({
  body: z.object({
    orderedBooks: z
      .array(
        z.object({
          bookId: z.string({ required_error: 'bookId is required' }),
          quantity: z.number({ required_error: 'quantity is required' }).min(1),
        }),
        { required_error: 'orderedBooks is required' }
      )
      .nonempty({ message: 'cart has no items' }),
  }),
});

export const OrderValidation = {
  createOrder,
};
