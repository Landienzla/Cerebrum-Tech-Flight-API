import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";
import database from "../../utils/database";
import { checkPassword, createJWT } from "../../utils/index";
async function getUser(email: string) {
  const user_query_response = await database.query(
    `SELECT * FROM users WHERE email = '${email}'`
  );
  const user = user_query_response?.rows?.[0];
  return user;
}

export default async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return sendResponse(req, res, 400, {
      message: "missing_fields",
    });
  }
  const user = await getUser(email);
  if (!user) {
    return sendResponse(req, res, 400, {
      message: "user_not_found",
    });
  }
  let isPasswordCorrect = await checkPassword(`${password}`, user.password);
  if (!isPasswordCorrect) {
    return sendResponse(req, res, 400, {
      message: "wrong_password",
    });
  }
  let jwt_token = createJWT({
    email,
    userId: user.userId,
    expireIn: 1000 * 60 * 60 * 24 * 1, // 1 days
  });
  return sendResponse(req, res, 200, {
    message: "success",
    token: jwt_token,
  });
};
