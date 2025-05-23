












import { Router } from "express";
import * as controller from "./schedule.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = Router();

// Get all schedules for the user
router.get("/getAllSchedules", auth, controller.getAllSchedules);

// Get one schedule by ID
router.get("/getScheduleById/:id", auth, controller.getScheduleById);

// Create a new schedule
router.post("/createSchedule", auth, controller.createSchedule);

// Update an existing schedule
router.put("/updateSchedule/:id", auth, controller.updateSchedule);

// Delete a schedule
router.delete("/deleteSchedule/:id", auth, controller.deleteSchedule);

// Get today's schedules
router.get("/getTodaySchedules", auth, controller.getTodaySchedules);

export default router;


/*
import { Router } from "express";
import * as controller from "./schedule.controller.js";

const router = Router();

router.get("/getAllSchedules", controller.getAllSchedules);
router.get("/getScheduleById/:id", controller.getScheduleById);
router.post("/createSchedule", controller.createSchedule);
router.put("/updateSchedule/:id", controller.updateSchedule);
router.delete("/deleteSchedule/:id", controller.deleteSchedule);
router.get("/getTodaySchedules", controller.getTodaySchedules);

export default router;
*/