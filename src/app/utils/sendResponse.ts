import { Response } from "express";

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
    ...(data.meta && {
      meta: {
        page: data?.meta?.page || 1,
        limit: data?.meta?.limit || 10,
        total: data?.meta?.total,
      },
    }),
  });
};

export default sendResponse;
