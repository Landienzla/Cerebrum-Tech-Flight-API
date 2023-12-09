import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";
import database from "../../utils/database";
import { createToken } from "../../utils/index";
import sendEmail, { verificationEmailTemplate } from "../../utils/email";
async function getUser(email: string) {
  const user_query_response = await database.query(
    `SELECT * FROM users WHERE email = '${email}'`
  );
  const user = user_query_response?.rows?.[0];
  return user;
}

export default async (req: Request, res: Response) => {
  var { email, send_email } = req.query;
  if (!send_email) send_email = "true"; // default value
  var send_email_boolean: boolean = Boolean(send_email === "true"); // convert string to boolean
  if (!email) {
    return sendResponse(req, res, 400, {
      message: "missing_fields",
    });
  }
  const user = await getUser(`${email}`);
  if (!user) {
    return sendResponse(req, res, 400, {
      message: "invalid_email",
    });
  }
  if (user.emailVerified) {
    return sendResponse(req, res, 400, {
      message: "already_verified",
    });
  }
  let verificationExpires = new Date(
    new Date().getTime() + 1000 * 60 * 60 * 24
  ).toISOString(); // 24 hours
  let token = createToken(); // create token
  const queryText = `
  UPDATE users
  SET "verificationToken" = $1, "verificationExpires" = $2
  WHERE "email" = $3
  RETURNING "verificationToken"
`;
  const values = [token, verificationExpires, email];

  const user_query_response = await database.query(queryText, values);
  send_email_boolean &&
    (await sendEmail(
      `${email}`,
      "Verify your email",
      verificationEmailTemplate
        .replace(
          `{{verificationLink}}`,
          `${process.env.BASE_URL}/auth/verify_code?token=${token}`
        )
        .replace(`{{verificationCode}}`, `${token}`)
    ));
  return sendResponse(req, res, 200, {
    message: "success",
    ...(!send_email_boolean && {
      verificationToken: token,
    }),
  });
};
