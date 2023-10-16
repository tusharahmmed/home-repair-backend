import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../../config';
import prisma from '../../../shared/prisma';
import { excludeFields } from '../../../shared/utils';

const getProfile = async (user: JwtPayload) => {
  const result = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  const removedPassword = excludeFields(result as User, ['password']);
  return removedPassword;
};
const updateProfile = async (payload: User, user: JwtPayload) => {
  // hash password
  if (payload.password) {
    payload.password = await bcrypt.hash(
      payload.password,
      Number(config.bcrypt_salt_round)
    );
  }
  const result = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: payload,
  });

  const removedPassword = excludeFields(result as User, ['password']);
  return removedPassword;
};

export const ProfileService = {
  getProfile,
  updateProfile,
};
