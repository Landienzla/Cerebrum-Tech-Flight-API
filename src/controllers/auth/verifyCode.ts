import database from "../../utils/database";
import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  const { token } = req.query;

  if (!token) {
    return sendResponse(req, res, 400, {
      message: "missing_fields",
    });
  }
  async function getUserByToken(token: string) {
    const user_query_response = await database.query(
      `SELECT * FROM users WHERE "verificationToken" = '${token}'`
    );
    const user = user_query_response?.rows?.[0];
    console.log(user);
    return user;
  }
  const user = await getUserByToken(`${token}`);
  if (!user) {
    return sendResponse(req, res, 400, {
      message: "invalid_token",
    });
  }
  function checkTokenExpiry() {
    const currentTime = new Date();
    const tokenExpiry = new Date(user.verificationExpires);

    console.log(currentTime.toISOString(), tokenExpiry);
    return currentTime > tokenExpiry;
  }
  const tokenExpired = checkTokenExpiry();
  if (tokenExpired) {
    return sendResponse(req, res, 400, {
      message: "token_expired",
    });
  }
  const user_query_response = await database.query(
    `UPDATE users SET "emailVerified" = true WHERE "verificationToken" = '${token}' RETURNING "email"`
  );
  const updatedUser = user_query_response?.rows?.[0];
  if (!updatedUser) {
    return sendResponse(req, res, 400, {
      message: "invalid_token",
    });
  }
  return sendResponse(req, res, 200, {
    message: "success",
  });
};
