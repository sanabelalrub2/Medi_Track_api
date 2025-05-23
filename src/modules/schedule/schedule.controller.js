// src/modules/schedule/schedule.controller.js
import scheduleModel from "../../../DB/models/schedule.model.js";

export const getAllSchedules = async (req, res) => {
  const schedules = await scheduleModel.find({ userId: req.user.id }).populate("medicationId");
  res.json({ message: "All schedules", schedules });
};

export const getScheduleById = async (req, res) => {
  const schedule = await scheduleModel.findOne({ _id: req.params.id, userId: req.user.id }).populate("medicationId");
  if (!schedule) return res.status(404).json({ message: "Schedule not found" });
  res.json({ schedule });
};

export const createSchedule = async (req, res) => {
  const { medicationId, time, dosage, days, startDate, endDate } = req.body;
  const schedule = await scheduleModel.create({
    userId: req.user.id,
    medicationId,
    time,
    dosage,
    days,
    startDate,
    endDate
  });
  res.status(201).json({ message: "Schedule created", schedule });
};

export const updateSchedule = async (req, res) => {
  const updated = await scheduleModel.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: "Schedule not found" });
  res.json({ message: "Updated", schedule: updated });
};

export const deleteSchedule = async (req, res) => {
  const deleted = await scheduleModel.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (!deleted) return res.status(404).json({ message: "Schedule not found" });
  res.json({ message: "Deleted successfully" });
};

export const getTodaySchedules = async (req, res) => {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" }); 
  const schedules = await scheduleModel.find({
    userId: req.user.id,
    days: today
  }).populate("medicationId");
  res.json({ message: "Today's schedules", schedules });
};
