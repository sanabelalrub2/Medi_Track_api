import { Router } from "express";
import * as controller from "./report.controller.js";

const router = Router();

router.post("/createReport", controller.createReport);
router.get("/getReportById/:id", controller.getReportById);
router.get("/getAllReports", controller.getAllReports);

export default router;
