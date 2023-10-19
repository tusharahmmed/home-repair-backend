'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.OrderValidation = void 0;
const zod_1 = require('zod');
const createOrder = zod_1.z.object({
  body: zod_1.z.object({
    serviceId: zod_1.z.string({ required_error: 'Service is is required' }),
    status: zod_1.z.string().optional(),
    address: zod_1.z.string({ required_error: 'address is required' }),
    visiting_date: zod_1.z.string({
      required_error: 'visiting data is required',
    }),
    visiting_hour: zod_1.z.string({
      required_error: 'visiting hour is required',
    }),
  }),
});
exports.OrderValidation = {
  createOrder,
};
