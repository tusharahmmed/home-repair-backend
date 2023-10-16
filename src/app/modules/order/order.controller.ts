import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const payload = req.body;
  const user = req.user;
  // add userId
  payload.userId = user?.id;

  const result = await OrderService.createOrder(payload, user?.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order created successfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const user = req.user;

  const result = await OrderService.getAllOrders(user as JwtPayload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  const result = await OrderService.getSingleOrder(id, user as JwtPayload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order fetched successfully',
    data: result,
  });
});

const updateOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const payload = req.body;

  const result = await OrderService.updateOrder(
    id,
    user as JwtPayload,
    payload
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order updated successfully',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  const result = await OrderService.deleteOrder(id, user as JwtPayload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order deleted successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
