/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { PAGINATION_FIELDS } from '../../../constants/pagination';
import { IUploadFile } from '../../../interfaces/file';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { PORTFOLIO_FILTERS_FIELDS } from './portfolio.contant';
import { PortfolioService } from './portfolio.service';

const insertIntoDb = catchAsync(async (req, res) => {
  const { data } = req.body;

  const file = req?.file as any;

  const result = await PortfolioService.insertIntoDb(
    JSON.parse(data),
    file as IUploadFile
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Portfolio created successfully',
    data: result,
  });
});

const getAllDocument = catchAsync(async (req, res) => {
  const options = pick(req.query, PAGINATION_FIELDS);

  const filters = pick(req.query, PORTFOLIO_FILTERS_FIELDS);

  const result = await PortfolioService.getAllDocument(options, filters);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Portfolio fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getDocumentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PortfolioService.getDocumentById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Portfolio fetched successfully',
    data: result,
  });
});
const getDocumentByCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;

  const options = pick(req.query, PAGINATION_FIELDS);

  const result = await PortfolioService.getDocumentByCategory(
    categoryId,
    options
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'data fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateDocumentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const file = req?.file as any;

  const result = await PortfolioService.updateDocumentById(
    id,
    JSON.parse(data),
    file
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Portfolio updated successfully',
    data: result,
  });
});

const deleteDocumentById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await PortfolioService.deleteDocumentById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Portfolio deleted successfully',
    data: result,
  });
});

export const PortfolioController = {
  insertIntoDb,
  getAllDocument,
  getDocumentById,
  getDocumentByCategory,
  updateDocumentById,
  deleteDocumentById,
};
