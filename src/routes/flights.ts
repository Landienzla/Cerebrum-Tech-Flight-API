import sendResponse from "../utils/sendResponse";
import { Router } from "express";
import Auth from "../middlewares/auth";
import catchFunction from "../utils/catchFunction";
import {
  flightDetailsController,
  listFlightsController,
} from "../controllers/flights";
const router = Router();

router.get("/list", Auth, catchFunction(listFlightsController));

router.get("/:id", Auth, catchFunction(flightDetailsController));

export default router;
