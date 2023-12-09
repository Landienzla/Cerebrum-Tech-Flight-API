import { RequestWithUser, ParsedLinks } from "../../types";
import database from "../../utils/database";
import sendResponse from "../../utils/sendResponse";
import { Response } from "express";
import API from "../../utils/schiphol/api";
import {
  getSeatPlan,
  getEmptySeatPlan,
} from "../../utils/schiphol/createSeatPlan";

export default async (req: RequestWithUser, res: Response) => {
  const { id: flight_id } = req.params;
  const {
    data: flightDetails,
    status,
    headers,
  } = await API.get(`/flights/${flight_id}`);
  if (status !== 200) {
    return sendResponse(req, res, status, {
      message: "flight_not_found",
    });
  }
  let seatPlan = getEmptySeatPlan(); // get empty seat plan, with all seats available because we don't have any data
  let flight = {
    ...flightDetails,
    seatPlan,
  };
  return sendResponse(req, res, 200, {
    message: "success",
    flight,
  });
};
