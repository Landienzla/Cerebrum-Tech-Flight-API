import { Router } from "express";
import {
  loginController,
  registerController,
  forgotPasswordController,
  verifyCodeController,
  sendVerificationController,
} from "../controllers/auth";
import catchFunction from "../utils/catchFunction";

const router = Router();

router.post("/login", catchFunction(loginController));
router.post("/register", catchFunction(registerController));
router.post("/forgot_password", catchFunction(forgotPasswordController));
router.get("/verify_code", catchFunction(verifyCodeController));
router.get("/send_verification", catchFunction(sendVerificationController));

export default router;
