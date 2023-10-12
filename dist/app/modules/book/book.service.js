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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.BookService = void 0;
const paginationHelper_1 = require('../../../helpers/paginationHelper');
const prisma_1 = __importDefault(require('../../../shared/prisma'));
const book_constant_1 = require('./book.constant');
const insertIntoDb = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.create({
      data: payload,
      include: {
        category: true,
      },
    });
    return result;
  });
const getAllDocument = (options, filters) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // pagination
    const { page, skip, size, sortBy, sortOrder } =
      paginationHelper_1.paginationHelpers.calculatePagination(options);
    // filters
    // const { search, minPrice, maxPrice, category } = filters;
    const { search } = filters,
      filterData = __rest(filters, ['search']);
    const andConditions = [];
    // generate search condition
    if (search) {
      andConditions.push({
        OR: book_constant_1.BOOK_SEARCH_FIELDS.map(field => ({
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
    const whereConditions =
      andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.book.findMany({
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
    const total = yield prisma_1.default.book.count({ where: whereConditions });
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
  });
const getDocumentById = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });
    return result;
  });
const getDocumentByCategory = (categoryId, options) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // pagination
    const { page, skip, size, sortBy, sortOrder } =
      paginationHelper_1.paginationHelpers.calculatePagination(options);
    const result = yield prisma_1.default.book.findMany({
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
    const total = yield prisma_1.default.book.count({
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
  });
const updateDocumentById = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.update({
      where: {
        id,
      },
      data: payload,
    });
    return result;
  });
const deleteDocumentById = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.delete({
      where: {
        id,
      },
    });
    return result;
  });
exports.BookService = {
  insertIntoDb,
  getAllDocument,
  getDocumentById,
  getDocumentByCategory,
  updateDocumentById,
  deleteDocumentById,
};
