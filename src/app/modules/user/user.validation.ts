import { USER_ROLE } from '@prisma/client';
import { z } from 'zod';

const createUser = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }),
    email: z.string({ required_error: 'email is required' }),
    password: z.string({ required_error: 'password is required' }),
    role: z
      .enum([...Object.values(USER_ROLE)] as [string, ...string[]])
      .optional(),
    contactNo: z.string({ required_error: 'contactNo is required' }).optional(),
    address: z.string({ required_error: 'address is required' }).optional(),
    profileImg: z.string().optional(),
  }),
});

const updateUser = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    role: z
      .enum([...Object.values(USER_ROLE)] as [string, ...string[]])
      .optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    profileImg: z.string().optional(),
  }),
});

export const UserValidation = {
  updateUser,
  createUser,
};
