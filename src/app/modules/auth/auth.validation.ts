import { USER_ROLE } from '@prisma/client';
import { z } from 'zod';

const signup = z.object({
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

const signin = z.object({
  body: z.object({
    email: z.string({ required_error: 'email is required' }),
    password: z.string({ required_error: 'password is required' }),
  }),
});

export const AuthValidation = {
  signup,
  signin,
};
