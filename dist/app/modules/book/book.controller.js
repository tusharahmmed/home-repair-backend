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
exports.BookController = void 0;
const http_status_1 = __importDefault(require('http-status'));
const pagination_1 = require('../../../constants/pagination');
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const pick_1 = __importDefault(require('../../../shared/pick'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const book_constant_1 = require('./book.constant');
const book_service_1 = require('./book.service');
const insertIntoDb = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.BookService.insertIntoDb(req.body);
    (0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Book created successfully',
      data: result,
    });
  })
);
const getAllDocument = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pick_1.default)(
      req.query,
      pagination_1.PAGINATION_FIELDS
    );
    const filters = (0, pick_1.default)(
      req.query,
      book_constant_1.BOOK_FILTERS_FIELDS
    );
    const result = yield book_service_1.BookService.getAllDocument(
      options,
      filters
    );
    (0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Books fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  })
);
const getDocumentById = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield book_service_1.BookService.getDocumentById(id);
    (0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Book fetched successfully',
      data: result,
    });
  })
);
const getDocumentByCategory = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const options = (0, pick_1.default)(
      req.query,
      pagination_1.PAGINATION_FIELDS
    );
    const result = yield book_service_1.BookService.getDocumentByCategory(
      categoryId,
      options
    );
    (0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Books with associated category data fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  })
);
const updateDocumentById = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const result = yield book_service_1.BookService.updateDocumentById(
      id,
      payload
    );
    (0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Book updated successfully',
      data: result,
    });
  })
);
const deleteDocumentById = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield book_service_1.BookService.deleteDocumentById(id);
    (0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Book is deleted successfully',
      data: result,
    });
  })
);
exports.BookController = {
  insertIntoDb,
  getAllDocument,
  getDocumentById,
  getDocumentByCategory,
  updateDocumentById,
  deleteDocumentById,
};
