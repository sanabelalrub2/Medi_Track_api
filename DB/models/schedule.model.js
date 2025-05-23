// DB/models/schedule.model.js
import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  medicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medication",
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  time: String,
  dosage: String,
  days: [String], 
  startDate: Date,
  endDate: Date
}, { timestamps: true });

const scheduleModel = mongoose.model("Schedule", scheduleSchema);
export default scheduleModel;
