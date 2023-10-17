import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

import { JwtPayload } from 'jsonwebtoken';
import { ReviewService } from './review.service';

const insertIntoDb = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await ReviewService.insertIntoDb(req.body, user as JwtPayload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review created successfully',
    data: result,
  });
});

const getAllDocument = catchAsync(async (req, res) => {
  const result = await ReviewService.getAllDocument();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Reviews fetched successfully',
    data: result,
  });
});

const getDocumentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReviewService.getDocumentById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review fetched successfully',
    data: result,
  });
});

const updateDocumentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await ReviewService.updateDocumentById(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review updated successfully',
    data: result,
  });
});

const deleteDocumentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  const result = await ReviewService.deleteDocumentById(id, user as JwtPayload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review deleted successfully',
    data: result,
  });
});

export const ReviewController = {
  insertIntoDb,
  getAllDocument,
  getDocumentById,
  updateDocumentById,
  deleteDocumentById,
};
