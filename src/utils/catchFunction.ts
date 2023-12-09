import { Request, Response, NextFunction } from "express";
import sendResponse from "./sendResponse";
import { logError } from "./logger";

const catchFunction = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: Error) => {
      console.log(err);//TODO remove
      logError(
        `Req url : ${req.originalUrl} method : ${req.method} -> On catch function : ${err.message}`
      );
      sendResponse(req, res, 500, err, err.message);
    });
  };
};

export default catchFunction;
