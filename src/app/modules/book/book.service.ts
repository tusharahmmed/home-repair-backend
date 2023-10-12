/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { BOOK_SEARCH_FIELDS } from './book.constant';
import { IBookFilters } from './book.interface';

const insertIntoDb = async (payload: Book) => {
  const result = await prisma.book.create({
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
): Promise<IGenericResponse<Book[]>> => {
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

        if (key === 'minPrice') {
          return {
            price: {
              gte: Number(filterData['minPrice']),
            },
          };
        }
        if (key === 'maxPrice') {
          return {
            price: {
              lte: Number(filterData['maxPrice']),
            },
          };
        }
      }),
    });
  }

  const whereConditions: any =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
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

  const total = await prisma.book.count({ where: whereConditions });
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
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });

  return result;
};

const getDocumentByCategory = async (
  categoryId: string,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  // pagination
  const { page, skip, size, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const result = await prisma.book.findMany({
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

  const total = await prisma.book.count({
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

const updateDocumentById = async (id: string, payload: Book) => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteDocumentById = async (id: string) => {
  const result = await prisma.book.delete({
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
