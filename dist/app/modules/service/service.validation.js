'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ServiceValidation = void 0;
const zod_1 = require('zod');
const createService = zod_1.z.object({
  body: zod_1.z.object({
    data: zod_1.z.object({
      title: zod_1.z.string({ required_error: 'title is required' }),
      image: zod_1.z.string().optional(),
      description: zod_1.z.string({
        required_error: 'description is required',
      }),
      categoryId: zod_1.z.string({ required_error: 'categoryId is required' }),
    }),
  }),
});
const updateServie = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string().optional(),
    image: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    categoryId: zod_1.z.string().optional(),
  }),
});
exports.ServiceValidation = {
  createService,
  updateServie,
};
