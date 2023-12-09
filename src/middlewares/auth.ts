import { decodeJWT, isJWTExpired, verifyJWT } from "../utils/index";
import { Response, NextFunction } from "express";
import { RequestWithUser } from "../types";
export default async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(400).json({
      message: "missing_fields",
    });
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(400).json({
      message: "missing_fields",
    });
  }
  let isVerifiedJWT = verifyJWT(token);
  if (!isVerifiedJWT) {
    return res.status(400).json({
      message: "invalid_token",
    });
  }
  let isTokenExpired = isJWTExpired(token);
  if (isTokenExpired) {
    return res.status(400).json({
      message: "token_expired",
    });
  }

  let decodedJWT = decodeJWT(token);
  if (!decodedJWT) {
    return res.status(400).json({
      message: "invalid_token",
    });
  }

  if (!decodedJWT.email || !decodedJWT.userId) {
    return res.status(400).json({
      message: "invalid_token",
    });
  }

  req.user = {
    email: decodedJWT.email,
    userId: decodedJWT.userId,
  };
  return next();
};
