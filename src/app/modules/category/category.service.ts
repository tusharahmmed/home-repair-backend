import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDb = async (payload: Category) => {
  const result = await prisma.category.create({
    data: payload,
  });

  return result;
};

const getAllDocument = async () => {
  const result = await prisma.category.findMany();

  return result;
};

const getDocumentById = async (id: string) => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateDocumentById = async (id: string, payload: Category) => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteDocumentById = async (id: string) => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });

  return result;
};

export const CategoryService = {
  insertIntoDb,
  getAllDocument,
  getDocumentById,
  updateDocumentById,
  deleteDocumentById,
};
