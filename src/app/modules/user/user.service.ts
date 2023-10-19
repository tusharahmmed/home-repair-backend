/* eslint-disable @typescript-eslint/no-explicit-any */
import { USER_ROLE, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../../config';
import prisma from '../../../shared/prisma';
import { excludeFields } from '../../../shared/utils';

const getAllFromDb = async (user: JwtPayload) => {
  let result: any = [];

  if (user.role === USER_ROLE.admin) {
    result = await prisma.user.findMany({
      where: {
        role: 'user',
      },
    });
  }

  if (user.role === USER_ROLE.super_admin) {
    result = await prisma.user.findMany({
      where: {
        role: 'admin',
      },
    });
  }

  const passwordRemoved = await result.map((user: any) => {
    return excludeFields(user, ['password']);
  });

  return passwordRemoved;
};

const getDocumentById = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (result) {
    const passwordRemoved = excludeFields(result as User, ['password']);

    return passwordRemoved;
  }
  return result;
};

const updateDocumentById = async (id: string, payload: Partial<User>) => {
  // update password
  if (payload.password) {
    payload.password = await bcrypt.hash(
      payload.password,
      Number(config.bcrypt_salt_round)
    );
  }

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  const passwordRemoved = excludeFields(result, ['password']);

  return passwordRemoved;
};

const deleteDocumentById = async (id: string) => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });

  const passwordRemoved = excludeFields(result, ['password']);
  return passwordRemoved;
};

const createDocument = async (payload: User) => {
  // update password
  if (payload.password) {
    payload.password = await bcrypt.hash(
      payload.password,
      Number(config.bcrypt_salt_round)
    );
  }

  const result = await prisma.user.create({
    data: payload,
  });

  const passwordRemoved = excludeFields(result, ['password']);
  return passwordRemoved;
};

export const UserService = {
  getAllFromDb,
  getDocumentById,
  updateDocumentById,
  deleteDocumentById,
  createDocument,
};
