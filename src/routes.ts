import { Router } from "express";
import authRoutes from "./routes/auth";
const routes_arr = ["auth"];
const routes = Router();

routes.get("/", (req, res) => {
  return res.json({ status: "live" });
});
routes.use("/auth", authRoutes);

export default routes;
