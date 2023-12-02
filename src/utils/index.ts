import bcrypt from "bcryptjs";

export const checkPassword = async (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> => {
  return bcrypt.compare(candidatePassword, userPassword);
};

export const encryptPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const checkObject = (data: any[]): boolean => {
  return data?.length > 0;
};

export const checkParam = (data: any): boolean => {
  return data === undefined;
};
