import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";
import database from "../../utils/database";
import { encryptPassword, createToken, createJWT } from "../../utils/index";
import sendEmail, { verificationEmailTemplate } from "../../utils/email";
async function createUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  token: string
) {
  try {
    let currentDate = new Date().toISOString();
    let verificationExpires = new Date(
      new Date().getTime() + 1000 * 60 * 60 * 24
    ).toISOString(); // 24 hours
    console.log(currentDate, verificationExpires);
    // const user_query_response = await database.query(
    //   `INSERT INTO users("email", "password", "firstName", "lastName","verificationToken", "verificationExpires", "createdAt", "updatedAt") VALUES('${email}', '${password}', '${firstName}', '${lastName}', '${token}', '${verificationExpires}','${currentDate}','${currentDate}') RETURNING "verificationToken","userId","email"`
    // );
    const queryText = `INSERT INTO users("email", "password", "firstName", "lastName", "verificationToken", "verificationExpires", "createdAt", "updatedAt") 
                   VALUES($1, $2, $3, $4, $5, $6, $7, $8) 
                   RETURNING "verificationToken", "userId", "email"`;

    const values = [
      email,
      password,
      firstName,
      lastName,
      token,
      verificationExpires,
      currentDate,
      currentDate,
    ];
    const user_query_response = await database.query(queryText, values);

    const user = user_query_response?.rows?.[0];
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function checkEmailExists(email: string) {
  const user_query_response = await database.query(
    `SELECT * FROM users WHERE email = '${email}'`
  );
  const user = user_query_response?.rows?.length > 0;
  return user;
}

export default async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body; // get body params
  var { send_email } = req.query; // get query params
  if (!send_email) send_email = "true"; // default value
  var send_email_boolean: boolean = Boolean(send_email === "true"); // convert string to boolean

  function isVerificationEmailSend() {
    // check if verification email is send
    if (send_email_boolean) {
      // if send_email_boolean is true
      return true; // return true
    } else if (!send_email_boolean) {
      // if send_email_boolean is false
      return false; // return false
    }
  }
  if (!email || !password || !firstName || !lastName) {
    // check required fields
    return sendResponse(req, res, 400, {
      message: "missing_fields",
    });
  }
  const userExists = await checkEmailExists(email); // check if user exists
  let token = createToken(); // create token

  if (userExists) {
    return sendResponse(req, res, 400, {
      message: "user_exists",
    });
  }
  let encryptedPassword = await encryptPassword(`${password}`); // encrypt password

  const user = await createUser(
    email,
    encryptedPassword,
    firstName,
    lastName,
    token
  );
  if (!user) {
    return sendResponse(req, res, 404, {
      message: "user_cannot_be_created",
    });
  }

  if (isVerificationEmailSend()) {
    const resp = await sendEmail(
      email,
      "Verify your email",
      verificationEmailTemplate
        .replace(
          `{{verificationLink}}`,
          `${process.env.BASE_URL}/auth/verify_code?token=${user.verificationToken}`
        )
        .replace(`{{verificationCode}}`, `${user.verificationToken}`)
    );
    // send email
  }

  user.token = createJWT({
    email,
    userId: user.userId,
    expireIn: 1000 * 60 * 60 * 24 * 1, // 1 days
  });
  return sendResponse(req, res, 200, {
    message: "success",
    token: user.token,
    ...(!isVerificationEmailSend() && {
      verificationToken: token,
    }),
  });
};
