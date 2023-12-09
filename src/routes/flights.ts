import sendResponse from "../utils/sendResponse";
import { Router } from "express";
import Auth from "../middlewares/auth";
const router = Router();

router.get("/list", Auth, (req, res) => {
  return sendResponse(req, res, 200, {
    message: "flights_list",
  });
});

router.get("/:id", (req, res) => {
  return sendResponse(req, res, 200, {
    message: "flight_details",
  });
});

export default router;
