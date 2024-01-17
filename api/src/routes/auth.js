import { Router } from "express";
import { register, login, googleLogin,generateOtp,verifyOtp } from "../controllers/auth.js";
const router = Router();

//user registration
router.post("/register", register);

//user login
router.post("/login", login);

//google signup and login
router.post("/google-login", googleLogin);


//generate otp
router.post("/forgot-password",generateOtp)

//verify otp

router.post("/verify-password",verifyOtp)


export default router;
