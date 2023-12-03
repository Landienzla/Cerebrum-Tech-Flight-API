import bcrypt from "bcryptjs";

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
