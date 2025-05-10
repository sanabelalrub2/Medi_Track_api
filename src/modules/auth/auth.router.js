import { Router } from "express";
import * as controller from "./auth.controller.js";
const router =Router();
 

router.post('/register',controller.register);
router.post('/confirmEmail/:email',controller.confirmEmail)
router.post('/login',controller.login);
router.post('/sendCode',controller.sendCode);
export default router;
