import express from "express";
import { Login, SignUp, VerifyOtp } from "../controllers/User.controller";
import { ContactUs, UpdateProfile } from "../controllers/User.controller";
import { UpdatePassword, AdminLogin } from "../controllers/User.controller";
import { ResetPassword } from "../controllers/User.controller";
import { VerifyResetPasswordOTP } from "../controllers/User.controller";
import { ChangePassword } from "../controllers/User.controller";
import { GetAuther, AllAuthers } from "../controllers/User.controller";
const router = express.Router();

router.post("/register", SignUp);
router.post("/login", Login);
router.post("/verify", VerifyOtp);
router.post("/contact", ContactUs);
router.patch("/update", UpdateProfile);
router.patch("/update-password", UpdatePassword);
router.post("/reset-password", ResetPassword);
router.post("/verify-reset-otp", VerifyResetPasswordOTP);
router.patch("/change-password", ChangePassword);
router.get("/auther", GetAuther);
router.get("/all-authers", AllAuthers);
// Admin Routes
router.post("/admin/login", AdminLogin);
export default router;
