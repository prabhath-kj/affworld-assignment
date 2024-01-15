import { Router } from "express";
import { register, login, googleLogin } from "../controllers/auth.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/googleLogin", googleLogin);

export default router;
