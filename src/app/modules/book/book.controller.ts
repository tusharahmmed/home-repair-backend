import httpStatus from 'http-status';
import { PAGINATION_FIELDS } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { BOOK_FILTERS_FIELDS } from './book.constant';
import { BookService } from './book.service';

const insertIntoDb = catchAsync(async (req, res) => {
  const result = await BookService.insertIntoDb(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book created successfully',
    data: result,
  });
});

const getAllDocument = catchAsync(async (req, res) => {
  const options = pick(req.query, PAGINATION_FIELDS);

  const filters = pick(req.query, BOOK_FILTERS_FIELDS);

  const result = await BookService.getAllDocument(options, filters);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Books fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getDocumentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookService.getDocumentById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book fetched successfully',
    data: result,
  });
});
const getDocumentByCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;

  const options = pick(req.query, PAGINATION_FIELDS);

  const result = await BookService.getDocumentByCategory(categoryId, options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Books with associated category data fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateDocumentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await BookService.updateDocumentById(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book updated successfully',
    data: result,
  });
});

const deleteDocumentById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await BookService.deleteDocumentById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book is deleted successfully',
    data: result,
  });
});

export const BookController = {
  insertIntoDb,
  getAllDocument,
  getDocumentById,
  getDocumentByCategory,
  updateDocumentById,
  deleteDocumentById,
};
