'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserValidation = void 0;
const client_1 = require('@prisma/client');
const zod_1 = require('zod');
const createUser = zod_1.z.object({
  body: zod_1.z.object({
    name: zod_1.z.string({ required_error: 'name is required' }),
    email: zod_1.z.string({ required_error: 'email is required' }),
    password: zod_1.z.string({ required_error: 'password is required' }),
    role: zod_1.z.enum([...Object.values(client_1.USER_ROLE)]).optional(),
    contactNo: zod_1.z
      .string({ required_error: 'contactNo is required' })
      .optional(),
    address: zod_1.z
      .string({ required_error: 'address is required' })
      .optional(),
    profileImg: zod_1.z.string().optional(),
  }),
});
const updateUser = zod_1.z.object({
  body: zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    password: zod_1.z.string().optional(),
    role: zod_1.z.enum([...Object.values(client_1.USER_ROLE)]).optional(),
    contactNo: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    profileImg: zod_1.z.string().optional(),
  }),
});
exports.UserValidation = {
  updateUser,
  createUser,
};
