import bcrypt from "bcryptjs";
var jwt = require("jsonwebtoken");

export const checkPassword = async (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> => {
  return bcrypt.compare(candidatePassword, userPassword); // Returns a boolean
};

export const encryptPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10); // Returns a hashed password
};

export const checkObject = (data: any[]): boolean => {
  return data?.length > 0; // Returns a boolean
};

export const checkParam = (data: any): boolean => {
  return data === undefined; // Returns a boolean
};

export const createToken = () => {
  return Math.random().toString(36).substr(2, 9); // Returns a random string
};

export const createJWT = (data: {
  email: string;
  userId: number;
  expireIn: number; // miliseconds
}) => {
  const token = jwt.sign(
    {
      email: data.email,
      userId: data.userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: data.expireIn,
    }
  );
  return token;
};

export const verifyJWT = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
export const decodeJWT = (token: string) => {
  if (!verifyJWT(token)) return null;
  return jwt.decode(token);
};
export const isJWTExpired = (token: string) => {
  let decodedJWT = decodeJWT(token);
  if (!decodedJWT) return true;
  return decodedJWT.exp < Date.now() / 1000;
};
