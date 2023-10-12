import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';

const insertIntoDb = catchAsync(async (req, res) => {
  const result = await CategoryService.insertIntoDb(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category created successfully',
    data: result,
  });
});

const getAllDocument = catchAsync(async (req, res) => {
  const result = await CategoryService.getAllDocument();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Categories fetched successfully',
    data: result,
  });
});

const getDocumentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryService.getDocumentById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category fetched successfully',
    data: result,
  });
});

const updateDocumentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await CategoryService.updateDocumentById(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category updated successfully',
    data: result,
  });
});

const deleteDocumentById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CategoryService.deleteDocumentById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category deleted successfully',
    data: result,
  });
});

export const CategoryController = {
  insertIntoDb,
  getAllDocument,
  getDocumentById,
  updateDocumentById,
  deleteDocumentById,
};
