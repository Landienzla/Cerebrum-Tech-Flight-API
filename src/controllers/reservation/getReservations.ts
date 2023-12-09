import { RequestWithUser, ParsedLinks } from "../../types";
import database from "../../utils/database";
import sendResponse from "../../utils/sendResponse";
import { Response } from "express";
import API from "../../utils/schiphol/api";
import {
  getSeatPlan,
  getEmptySeatPlan,
} from "../../utils/schiphol/createSeatPlan";
import { isStatusValid } from ".";

async function getReservations(status: string, userId: number | string) {
  let queryText = `
  SELECT * FROM reservations WHERE "userId" = $1 and status = $2;
`;
  let values = [userId, status];
  if (status === "all") {
    queryText = `
    SELECT * FROM reservations WHERE "userId" = $1;
  `;
    values = [userId];
  }
  const res = await database.query(queryText, values);
  return res.rows;
}
export default async (req: RequestWithUser, res: Response) => {
  const { status } = req.query || { status: "all" };
  if (!isStatusValid(`${status}`)) {
    return sendResponse(req, res, 400, {
      message: "invalid_status",
    });
  }
  const reservations = await getReservations(`${status}`, req.user.userId);
  sendResponse(req, res, 200, {
    message: "success",
    reservations,
  });
};
