import { Response } from 'express';

type IApiReponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  token?: string;
  meta?: {
    page: number;
    size: number;
    total: number;
    totalPage: number;
  };
  data?: T | null;
};

const sendResponse = <T>(res: Response, data: IApiReponse<T>): void => {
  const responseData: IApiReponse<T> = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message || null,
    meta: data.meta || null || undefined,
    data: data.data || null || undefined,
    token: data.token,
  };

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
