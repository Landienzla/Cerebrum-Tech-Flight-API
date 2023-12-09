import sendResponse from "../utils/sendResponse";
import { Router } from "express";
import Auth from "../middlewares/auth";
import catchFunction from "../utils/catchFunction";
import {
  createReservationController,
  getReservationsController,
  getReservationController,
  cancelReservationController,
} from "../controllers/reservation";
const router = Router();

router.post("/create", Auth, catchFunction(createReservationController));
router.get("/list", Auth, catchFunction(getReservationsController));
router.put("/reservations/:id/cancel", Auth, catchFunction(cancelReservationController));
router.get("/reservations/:id", Auth, catchFunction(getReservationController));
export default router;
