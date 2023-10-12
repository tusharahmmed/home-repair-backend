/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { USER_ROLE } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IOrderPayload } from './order.interface';

const createOrder = async (payload: IOrderPayload, userId: string) => {
  const { orderedBooks } = payload;

  // start tarnsaction
  const newOrder = await prisma.$transaction(async transactionClient => {
    // crate order
    const createdOrder = await transactionClient.order.create({
      data: { userId },
    });

    // create orderedBook
    const createdOrderBook = await transactionClient.orderedBook.createMany({
      data: orderedBooks.map(item => ({
        orderId: createdOrder.id,
        bookId: item.bookId,
        quantity: item.quantity,
      })),
    });

    return createdOrder;
  });

  if (newOrder) {
    const responseData: any = await prisma.order.findUnique({
      where: {
        id: newOrder.id,
      },

      include: {
        orderedBooks: {
          select: { bookId: true, quantity: true },
        },
      },
    });

    return responseData;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'unabel to create order');
};

const getAllOrders = async (user: JwtPayload) => {
  // if user a customer
  if (user.role === USER_ROLE.customer) {
    const result = await prisma.order.findMany({
      where: {
        userId: user.id,
      },
      include: {
        orderedBooks: {
          include: {
            book: true,
          },
        },
      },
    });

    return result;
  }

  // if admin
  const result = await prisma.order.findMany({
    include: {
      orderedBooks: {
        include: {
          book: true,
        },
      },
    },
  });

  return result;
};

const getSingleOrder = async (id: string, user: JwtPayload) => {
  // for customers
  if (user.role === USER_ROLE.customer) {
    const result = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        orderedBooks: {
          select: {
            bookId: true,
            quantity: true,
          },
        },
      },
    });

    // check same customer
    if (result?.userId === user.id) {
      return result;
    } else {
      throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
    }
  }

  // for admins

  const result = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      orderedBooks: {
        select: {
          bookId: true,
          quantity: true,
        },
      },
    },
  });

  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
