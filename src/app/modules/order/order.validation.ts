import { z } from 'zod';

const createOrder = z.object({
  body: z.object({
    serviceId: z.string({ required_error: 'Service is is required' }),
    status: z.string().optional(),
    address: z.string({ required_error: 'address is required' }),
    visiting_date: z.string({ required_error: 'visiting data is required' }),
    visiting_hour: z.string({ required_error: 'visiting hour is required' }),
  }),
});

export const OrderValidation = {
  createOrder,
};
