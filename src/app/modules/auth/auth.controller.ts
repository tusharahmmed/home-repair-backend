import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const signup = catchAsync(async (req, res) => {
  const result = await AuthService.signup(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  });
});

const signin = catchAsync(async (req, res) => {
  const result = await AuthService.signin(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User signin successfully!',
    data: result,
  });
});

export const AuthController = {
  signup,
  signin,
};
