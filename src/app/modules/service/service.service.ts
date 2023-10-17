/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { BOOK_SEARCH_FIELDS } from './service.constant';
import { IBookFilters } from './service.interface';

const insertIntoDb = async (payload: Service) => {
  const result = await prisma.service.create({
    data: payload,
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

const updateDocumentById = async (id: string, payload: Service) => {
  const result = await prisma.service.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteDocumentById = async (id: string) => {
  const result = await prisma.service.delete({
    where: {
      id,
    },
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
