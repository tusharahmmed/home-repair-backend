import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';

const getProfile = catchAsync(async (req, res) => {
  const result = await ProfileService.getProfile(req.user as JwtPayload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile retrieved successfully',
    data: result,
  });
});
const updateProfile = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await ProfileService.updateProfile(
    payload,
    req.user as JwtPayload
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile updated successfully',
    data: result,
  });
});

export const ProfileController = {
  getProfile,
  updateProfile,
};
