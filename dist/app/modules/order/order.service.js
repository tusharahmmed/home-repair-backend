'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.OrderService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const client_1 = require('@prisma/client');
const http_status_1 = __importDefault(require('http-status'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const prisma_1 = __importDefault(require('../../../shared/prisma'));
const createOrder = (payload, userId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    payload.userId = userId;
    // create order
    const newOrder = yield prisma_1.default.order.create({
      data: payload,
    });
    return newOrder;
  });
const getAllOrders = user =>
  __awaiter(void 0, void 0, void 0, function* () {
    // if user a customer
    if (user.role === client_1.USER_ROLE.user) {
      const result = yield prisma_1.default.order.findMany({
        where: {
          userId: user === null || user === void 0 ? void 0 : user.id,
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
    const result = yield prisma_1.default.order.findMany({
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
  });
const getSingleOrder = (id, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // for customers
    if (user.role === client_1.USER_ROLE.user) {
      const result = yield prisma_1.default.order.findUnique({
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
      if (
        (result === null || result === void 0 ? void 0 : result.userId) ===
        user.id
      ) {
        return result;
      } else {
        throw new ApiError_1.default(
          http_status_1.default.FORBIDDEN,
          'Forbidden'
        );
      }
    }
    // for admins
    const result = yield prisma_1.default.order.findUnique({
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
  });
const updateOrder = (id, user, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // for customers
    if (user.role === client_1.USER_ROLE.user) {
      const orderDetails = yield prisma_1.default.order.findUnique({
        where: {
          id,
        },
      });
      // check same customer then update
      if (
        (orderDetails === null || orderDetails === void 0
          ? void 0
          : orderDetails.userId) === user.id
      ) {
        const result = yield prisma_1.default.order.update({
          where: {
            id,
          },
          data: payload,
        });
        return result;
      } else {
        throw new ApiError_1.default(
          http_status_1.default.FORBIDDEN,
          'Forbidden'
        );
      }
    }
    // for admins
    const result = yield prisma_1.default.order.update({
      where: {
        id,
      },
      data: payload,
    });
    return result;
  });
const deleteOrder = (id, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // for customers
    if (user.role === client_1.USER_ROLE.user) {
      const orderDetails = yield prisma_1.default.order.findUnique({
        where: {
          id,
        },
      });
      // check same customer then update
      if (
        (orderDetails === null || orderDetails === void 0
          ? void 0
          : orderDetails.userId) === user.id
      ) {
        const result = yield prisma_1.default.order.delete({
          where: {
            id,
          },
        });
        return result;
      } else {
        throw new ApiError_1.default(
          http_status_1.default.FORBIDDEN,
          'Forbidden'
        );
      }
    }
    // for admins
    const result = yield prisma_1.default.order.delete({
      where: {
        id,
      },
    });
    return result;
  });
exports.OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
