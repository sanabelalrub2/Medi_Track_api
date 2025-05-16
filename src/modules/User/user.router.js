import { Router } from "express";
import * as userController from "./user.controller.js";

const router = Router();

router.get("/:id",  userController.getCurrentUser);

router.post("/createEmergencyContact", userController.createEmergencyContact);




router.put("/emergency-contact", userController.updateEmergencyContact);


router.get("/emergency-contact/:userId/:contactId", userController.getEmergencyContact);

router.delete("/emergency-contact/:userId/:contactId", userController.deleteEmergencyContact);

export default router;
