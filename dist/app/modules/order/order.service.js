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
    const { orderedBooks } = payload;
    // start tarnsaction
    const newOrder = yield prisma_1.default.$transaction(transactionClient =>
      __awaiter(void 0, void 0, void 0, function* () {
        // crate order
        const createdOrder = yield transactionClient.order.create({
          data: { userId },
        });
        // create orderedBook
        const createdOrderBook = yield transactionClient.orderedBook.createMany(
          {
            data: orderedBooks.map(item => ({
              orderId: createdOrder.id,
              bookId: item.bookId,
              quantity: item.quantity,
            })),
          }
        );
        return createdOrder;
      })
    );
    if (newOrder) {
      const responseData = yield prisma_1.default.order.findUnique({
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
    throw new ApiError_1.default(
      http_status_1.default.BAD_REQUEST,
      'unabel to create order'
    );
  });
const getAllOrders = user =>
  __awaiter(void 0, void 0, void 0, function* () {
    // if user a customer
    if (user.role === client_1.USER_ROLE.customer) {
      const result = yield prisma_1.default.order.findMany({
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
    const result = yield prisma_1.default.order.findMany({
      include: {
        orderedBooks: {
          include: {
            book: true,
          },
        },
      },
    });
    return result;
  });
const getSingleOrder = (id, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // for customers
    if (user.role === client_1.USER_ROLE.customer) {
      const result = yield prisma_1.default.order.findUnique({
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
        orderedBooks: {
          select: {
            bookId: true,
            quantity: true,
          },
        },
      },
    });
    return result;
  });
exports.OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
