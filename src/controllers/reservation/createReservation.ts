import { RequestWithUser, ParsedLinks } from "../../types";
import database from "../../utils/database";
import sendResponse from "../../utils/sendResponse";
import { Response } from "express";

async function createReservation(
  userId: string | number,
  flightId: string,
  seatNumber: string
) {
  const status = "active";
  const queryText = `
  INSERT INTO reservations("userId", "flightId", "seatNumber", "status", "createdAt", "updatedAt")
  VALUES($1, $2, $3, $4, NOW(), NOW())
  RETURNING *;
`;

  const values = [userId, flightId, seatNumber, status];
  const res = await database.query(queryText, values);
  return res.rows[0];
}
export default async (req: RequestWithUser, res: Response) => {
  const { flightId, seatNumber } = req.body;
  if (!flightId || !seatNumber) {
    return sendResponse(req, res, 400, {
      message: "missing_parameters",
    });
  }
  const reservation = await createReservation(
    req.user.userId,
    flightId,
    seatNumber
  );
  if (!reservation) {
    return sendResponse(req, res, 400, {
      message: "could_not_create_reservation",
    });
  }

  sendResponse(req, res, 200, {
    message: "success",
    reservation,
  });
};
