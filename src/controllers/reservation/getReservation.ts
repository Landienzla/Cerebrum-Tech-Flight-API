import { RequestWithUser, ParsedLinks } from "../../types";
import database from "../../utils/database";
import sendResponse from "../../utils/sendResponse";
import { Response } from "express";
import API from "../../utils/schiphol/api";
import {
  getSeatPlan,
  getEmptySeatPlan,
} from "../../utils/schiphol/createSeatPlan";
async function getReservation(reservationId: string | number) {
  const queryText = `
  SELECT * FROM reservations WHERE "reservationId" = $1;
`;
  const values = [reservationId];
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
  const reservation = await getReservation(parseInt(reservationId));
  if (!reservation) {
    return sendResponse(req, res, 400, {
      message: "reservation_not_found",
    });
  }
  let reservationResponse = {
    ...reservation,
    flightDetails: {},
  };
  const {
    data: flightDetails,
    status,
    headers,
  } = await API.get(`/flights/${reservation.flightId}`);
  if (status === 200) {
    reservationResponse.flightDetails = flightDetails;
  }

  sendResponse(req, res, 200, {
    message: "success",
    reservation: reservationResponse,
  });
};
