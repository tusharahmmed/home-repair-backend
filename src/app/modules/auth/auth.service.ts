import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
// import { excludeFields } from '../../../shared/utils';

const signup = async (payload: User) => {
  // hash password
  payload.password = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_round)
  );

  const result = await prisma.user.create({ data: payload });

  // const passwordRemoved = excludeFields(result, ['password']);

  // create token

  const accessToken = jwtHelpers.createToken(
    { id: result.id, role: result.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return { accessToken: accessToken };
};
const signin = async (payload: Pick<User, 'email' | 'password'>) => {
  const { email, password } = payload;
  // find user
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found!');
  }

  // match password

  const matchedResult = await bcrypt.compare(password, user.password);

  if (!matchedResult) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password does not matched');
  }

  // create token

  const accessToken = jwtHelpers.createToken(
    { id: user.id, role: user.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return { accessToken: accessToken };
};

export const AuthService = {
  signup,
  signin,
};
