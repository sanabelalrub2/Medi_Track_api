import { Router } from "express";
import * as controller from "./medication.controller.js"; 
 

const router = Router();
 
router.get("/getAllMedications",  controller.getAllMedications);
router.get("/getMedicationById/:id", controller.getMedicationById);
router.post("/createMedication",  controller.createMedication);
router.put("/updateMedication/:id",  controller.updateMedication);
router.delete("/deleteMedication/:id",  controller.deleteMedication);
router.get("/cart", controller.getCartMedications);

export default router;
