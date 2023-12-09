import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  return sendResponse(req, res, 200, {
    message: "forgotPassword",
  });
};
