/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IUploadFile } from '../../../interfaces/file';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { BOOK_SEARCH_FIELDS } from './service.constant';
import { IBookFilters } from './service.interface';

const insertIntoDb = async (payload: Service, file: IUploadFile) => {
  const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);
  if (!uploadedImage) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Image upload failed');
  }

  const result = await prisma.service.create({
    data: {
      ...payload,
      image: uploadedImage.secure_url as string,
    },
    include: {
      category: true,
    },
  });

  return result;
};

const getAllDocument = async (
  options: IPaginationOptions,
  filters: IBookFilters
): Promise<IGenericResponse<Service[]>> => {
  // pagination
  const { page, skip, size, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  // filters
  // const { search, minPrice, maxPrice, category } = filters;
  const { search, ...filterData } = filters;

  const andConditions = [];

  // generate search condition
  if (search) {
    andConditions.push({
      OR: BOOK_SEARCH_FIELDS.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  // generate filter condition
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (key === 'category') {
          return {
            categoryId: {
              equals: filterData['category'],
            },
          };
        }
      }),
    });
  }

  const whereConditions: any =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.service.findMany({
    // filters
    where: whereConditions,

    // pagination
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: size,

    include: {
      category: true,
    },
  });

  const total = await prisma.service.count({ where: whereConditions });
  const totalPage = Math.ceil(total / size);

  return {
    meta: {
      page,
      size,
      total,
      totalPage,
    },
    data: result,
  };
};

const getDocumentById = async (id: string) => {
  const result = await prisma.service.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      reviewAndRatings: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return result;
};

const getDocumentByCategory = async (
  categoryId: string,
  options: IPaginationOptions
): Promise<IGenericResponse<Service[]>> => {
  // pagination
  const { page, skip, size, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const result = await prisma.service.findMany({
    where: {
      categoryId,
    },
    // pagination
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: size,

    include: {
      category: true,
    },
  });

  const total = await prisma.service.count({
    where: {
      categoryId,
    },
  });
  const totalPage = Math.ceil(total / size);

  return {
    meta: {
      page,
      size,
      total,
      totalPage,
    },
    data: result,
  };
};

const updateDocumentById = async (
  id: string,
  payload: Service,
  file: IUploadFile
) => {
  const serviceDetails = await prisma.service.findUnique({
    where: { id },
  });

  if (file && serviceDetails?.image) {
    const response = await FileUploadHelper.replaceImage(
      serviceDetails.image,
      file
    );
    if (!response) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Image upload failed');
    }
    payload.image = response.secure_url as string;
  }

  if (file && !serviceDetails?.image) {
    const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);
    if (!uploadedImage) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Image upload failed');
    } else {
      payload.image = uploadedImage.secure_url;
    }
  }

  const result = await prisma.service.update({
    where: { id },
    data: {
      ...payload,
    },
  });

  return result;
};

const deleteDocumentById = async (id: string) => {
  const result = await prisma.$transaction(async tx => {
    const isExistHomeBanner = await tx.service.findUnique({
      where: { id },
      select: { image: true },
    });

    if (isExistHomeBanner?.image) {
      await FileUploadHelper.destroyToCloudinary(isExistHomeBanner.image);
    }
    return tx.service.delete({
      where: { id },
    });
  });

  return result;
};

export const BookService = {
  insertIntoDb,
  getAllDocument,
  getDocumentById,
  getDocumentByCategory,
  updateDocumentById,
  deleteDocumentById,
};
