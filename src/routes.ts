import { Router } from "express";
import authRoutes from "./routes/auth";
import flightsRoutes from "./routes/flights";
import sendResponse from "./utils/sendResponse";
const routes_arr = ["auth"];
const routes = Router();

routes.get("/", (req, res) => {
  return sendResponse(req, res, 200, {
    api_status: "live",
  });
});
routes.use("/auth", authRoutes);
routes.use("/flights", flightsRoutes);
export default routes;
