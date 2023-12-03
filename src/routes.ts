import { Router } from "express";
import authRoutes from "./routes/auth";
import sendResponse from "./utils/sendResponse";
const routes_arr = ["auth"];
const routes = Router();

routes.get("/", (req, res) => {
  return sendResponse(req, res, 200, {
    api_status: "live",
  });
});
routes.use("/auth", authRoutes);

export default routes;
