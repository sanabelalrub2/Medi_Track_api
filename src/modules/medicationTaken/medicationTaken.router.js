import { Router } from "express";
import * as controller from "./medicationTaken.controller.js";

const router = Router();

router.get("/getAllMedicationTaken", controller.getAllMedicationTaken);
router.post("/createMedicationTaken", controller.createMedicationTaken);
router.put("/updateMedicationTaken/:id", controller.updateMedicationTaken);
router.delete("/deleteMedicationTaken/:id", controller.deleteMedicationTaken);
router.get("/range", controller.getMedicationTakenInRange);

export default router;
