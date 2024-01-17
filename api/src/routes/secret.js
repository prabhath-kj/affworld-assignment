import {Router} from "express"
import authenticateJWT from "../middlewares/authenticateJwt.js"
import {getAllSecrets,postSecrets} from "../controllers/secret.js"
const router =Router()

// Post a Secret
router.post('/post-secret',authenticateJWT,postSecrets );

// Get All Secrets
router.get('/get-all-secrets',authenticateJWT,getAllSecrets);
export default router;
