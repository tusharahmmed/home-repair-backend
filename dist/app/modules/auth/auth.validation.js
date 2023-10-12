'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthValidation = void 0;
const client_1 = require('@prisma/client');
const zod_1 = require('zod');
const signup = zod_1.z.object({
  body: zod_1.z.object({
    name: zod_1.z.string({ required_error: 'name is required' }),
    email: zod_1.z.string({ required_error: 'email is required' }),
    password: zod_1.z.string({ required_error: 'password is required' }),
    role: zod_1.z.enum([...Object.values(client_1.USER_ROLE)], {
      required_error: 'role is required',
    }),
    contactNo: zod_1.z.string({ required_error: 'contactNo is required' }),
    address: zod_1.z.string({ required_error: 'address is required' }),
    profileImg: zod_1.z.string().optional(),
  }),
});
const signin = zod_1.z.object({
  body: zod_1.z.object({
    email: zod_1.z.string({ required_error: 'email is required' }),
    password: zod_1.z.string({ required_error: 'password is required' }),
  }),
});
exports.AuthValidation = {
  signup,
  signin,
};
