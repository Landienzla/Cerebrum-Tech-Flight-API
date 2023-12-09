import { Request } from "express";

interface RequestWithUser extends Request {
  user: {
    email: string;
    userId: string;
  };
}
type ParsedLinks = {
  first?: number;
  last?: number;
  next?: number;
  prev?: number;
};

export { RequestWithUser, ParsedLinks };
