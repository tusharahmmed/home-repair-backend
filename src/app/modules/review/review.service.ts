import { ReviewAndRating, USER_ROLE } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const insertIntoDb = async (payload: ReviewAndRating, user: JwtPayload) => {
  payload.userId = user.id;

  const result = await prisma.reviewAndRating.create({
    data: payload,
  });

  return result;
};

const getAllDocument = async () => {
  const result = await prisma.reviewAndRating.findMany();

  return result;
};

const getDocumentById = async (id: string) => {
  const result = await prisma.reviewAndRating.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateDocumentById = async (id: string, payload: ReviewAndRating) => {
  const result = await prisma.reviewAndRating.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteDocumentById = async (id: string, user: JwtPayload) => {
  if (user.role === USER_ROLE.user) {
    const cursor = await prisma.reviewAndRating.findUnique({
      where: {
        id,
      },
    });

    if (cursor?.userId === user.id) {
      const result = await prisma.reviewAndRating.delete({
        where: {
          id,
        },
      });

      return result;
    } else {
      throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden!');
    }
  }

  const result = await prisma.reviewAndRating.delete({
    where: {
      id,
    },
  });

  return result;
};

export const ReviewService = {
  insertIntoDb,
  getAllDocument,
  getDocumentById,
  updateDocumentById,
  deleteDocumentById,
};
