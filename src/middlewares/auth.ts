import { decodeJWT, isJWTExpired, verifyJWT } from "../utils/index";
import { Response, NextFunction } from "express";
import { RequestWithUser } from "../types";
import sendResponse from "../utils/sendResponse";
export default async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return sendResponse(req, res, 400, {
      message: "authorization_header_missing",
    });
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    return sendResponse(req, res, 400, {
      message: "authorization_header_missing",
    });
  }
  let isVerifiedJWT = verifyJWT(token);
  if (!isVerifiedJWT) {
    return sendResponse(req, res, 400, {
      message: "invalid_token",
    });
  }
  let isTokenExpired = isJWTExpired(token);
  if (isTokenExpired) {
    return sendResponse(req, res, 400, {
      message: "token_expired",
    });
  }

  let decodedJWT = decodeJWT(token);
  if (!decodedJWT) {
    return sendResponse(req, res, 400, {
      message: "invalid_token",
    });
  }

  if (!decodedJWT.email || !decodedJWT.userId) {
    return sendResponse(req, res, 400, {
      message: "invalid_token",
    });
  }

  req.user = {
    email: decodedJWT.email,
    userId: decodedJWT.userId,
  };
  return next();
};
