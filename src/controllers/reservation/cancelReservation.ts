import { RequestWithUser, ParsedLinks } from "../../types";
import database from "../../utils/database";
import sendResponse from "../../utils/sendResponse";
import { Response } from "express";
import API from "../../utils/schiphol/api";
import {
  getSeatPlan,
  getEmptySeatPlan,
} from "../../utils/schiphol/createSeatPlan";
async function cancelReservation(reservationId: string | number) {
  const queryText = `
  UPDATE reservations SET status = 'cancelled' WHERE "reservationId" = $1 RETURNING *;
`;
  const values = [reservationId];
  const res = await database.query(queryText, values);
  return res.rows[0];
}
async function checkReservationUser(
  reservationId: string | number,
  userId: string | number
) {
  const queryText = `
  SELECT * FROM reservations WHERE "reservationId" = $1 AND "userId" = $2;
`;
  const values = [reservationId, userId];
  const res = await database.query(queryText, values);
  return res.rows[0];
}
export default async (req: RequestWithUser, res: Response) => {
  const { id: reservationId } = req.params;
  if (!reservationId) {
    return sendResponse(req, res, 400, {
      message: "missing_parameters",
    });
  }
  const reservation = await checkReservationUser(
    parseInt(reservationId),
    req.user.userId
  );
  if (!reservation) {
    return sendResponse(req, res, 400, {
      message: "reservation_not_found",
    });
  }
  if (reservation.status === "cancelled") {
    return sendResponse(req, res, 400, {
      message: "reservation_already_cancelled",
    });
  }
  if (reservation.status === "completed") {
    return sendResponse(req, res, 400, {
      message: "reservation_already_completed",
    });
  }
  const cancelledReservation = await cancelReservation(reservationId);
  sendResponse(req, res, 200, {
    message: "success",
    reservation: cancelledReservation,
  });
};
