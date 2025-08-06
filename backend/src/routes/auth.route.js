import express from "express";
import {
  check,
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  verifyUser,
} from "../controllers/auth.controller.js";

const authRoutes = express.Router();

authRoutes.post("/register", registerUser);
authRoutes.get("/verify/:token", verifyUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/logout", logoutUser);
authRoutes.post("/forgot-password", forgotPassword);
authRoutes.post("/reset/:resetPasswordToken", resetPassword);
authRoutes.get("/check", authMiddleware, check);

export default authRoutes;
