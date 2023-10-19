'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require('zod');
const create = zod_1.z.object({
  body: zod_1.z.object({
    review: zod_1.z.string({ required_error: 'review is required' }),
    rating: zod_1.z
      .number({ required_error: 'rating is requird' })
      .max(5)
      .min(0),
    serviceId: zod_1.z.string({ required_error: 'service id is requird' }),
    userId: zod_1.z.string().optional(),
  }),
});
const update = zod_1.z.object({
  body: zod_1.z.object({
    review: zod_1.z.string().optional(),
    rating: zod_1.z.number().max(5).min(0).optional(),
    serviceId: zod_1.z.string().optional(),
    userId: zod_1.z.string().optional(),
  }),
});
exports.ReviewValidation = {
  create,
  update,
};
