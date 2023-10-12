'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const sendResponse = (res, data) => {
  const responseData = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message || null,
    meta: data.meta || null || undefined,
    data: data.data || null || undefined,
    token: data.token,
  };
  res.status(data.statusCode).json(responseData);
};
exports.default = sendResponse;
