import { Request, Response } from "express";
const sendResponse = (
  req: Request,
  res: Response,
  code: number,
  data: unknown,
  message: string
): Response => {
  return res.status(code).json({
    status: code >= 200 && code < 300 ? "Success" : "Error",
    data: data,
    message:
      message.length === 0
        ? code >= 200 && code < 300
          ? "success"
          : "something_went_wrong"
        : message,
  });
};

export default sendResponse;
