/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { USER_ROLE } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createOrder = async (payload: any, userId: string) => {
  payload.userId = userId;

  // create order

  const newOrder = await prisma.order.create({
    data: payload,
  });

  return newOrder;
};

const getAllOrders = async (user: JwtPayload) => {
  // if user a customer
  if (user.role === USER_ROLE.user) {
    const result = await prisma.order.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        service: {
          include: {
            category: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return result;
  }

  // if admin
  const result = await prisma.order.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      service: {
        include: {
          category: true,
        },
      },
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return result;
};

const getSingleOrder = async (id: string, user: JwtPayload) => {
  // for customers
  if (user.role === USER_ROLE.user) {
    const result = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        service: {
          include: {
            category: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
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
      service: {
        include: {
          category: true,
        },
      },
      user: {
        select: {
          name: true,
          email: true,
          contactNo: true,
        },
      },
    },
  });

  return result;
};

const updateOrder = async (id: string, user: JwtPayload, payload: any) => {
  // for customers
  if (user.role === USER_ROLE.user) {
    const orderDetails = await prisma.order.findUnique({
      where: {
        id,
      },
    });

    // check same customer then update
    if (orderDetails?.userId === user.id) {
      const result = await prisma.order.update({
        where: {
          id,
        },
        data: payload,
      });

      return result;
    } else {
      throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
    }
  }

  // for admins

  const result = await prisma.order.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteOrder = async (id: string, user: JwtPayload) => {
  // for customers
  if (user.role === USER_ROLE.user) {
    const orderDetails = await prisma.order.findUnique({
      where: {
        id,
      },
    });

    // check same customer then update
    if (orderDetails?.userId === user.id) {
      const result = await prisma.order.delete({
        where: {
          id,
        },
      });

      return result;
    } else {
      throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
    }
  }

  // for admins

  const result = await prisma.order.delete({
    where: {
      id,
    },
  });

  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
