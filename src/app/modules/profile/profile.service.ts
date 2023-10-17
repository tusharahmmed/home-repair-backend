import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { IUploadFile } from '../../../interfaces/file';
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
const updateProfile = async (
  user: JwtPayload,
  payload: User,
  file: IUploadFile
) => {
  const userDetails = await prisma.user.findUnique({
    where: { id: user.id },
  });

  // hash password
  if (payload.password) {
    payload.password = await bcrypt.hash(
      payload.password,
      Number(config.bcrypt_salt_round)
    );
  }
  // const result = await prisma.user.update({
  //   where: {
  //     id: user.id,
  //   },
  //   data: {
  //     ...payload,
  //     profileImg: uploadedImage.secure_url as string,
  //   },
  // });

  if (file && userDetails?.profileImg) {
    const response = await FileUploadHelper.replaceImage(
      userDetails.profileImg,
      file
    );
    if (!response) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Image upload failed');
    }
    payload.profileImg = response.secure_url as string;
  }

  const result = await prisma.user.update({
    where: { id: user.id },
    data: {
      ...payload,
    },
  });

  const removedPassword = excludeFields(result as User, ['password']);
  return removedPassword;
};

export const ProfileService = {
  getProfile,
  updateProfile,
};
