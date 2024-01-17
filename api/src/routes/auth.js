import { Router } from "express";
import { register, login, googleLogin } from "../controllers/auth.js";
const router = Router();

//user registration
router.post("/register", register);

//user login
router.post("/login", login);

//google signup and login
router.post("/google-login", googleLogin);

export default router;
