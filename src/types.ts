import { Request } from "express";

interface RequestWithUser extends Request {
  user: {
    email: string;
    userId: string;
  };
}

export { RequestWithUser };
