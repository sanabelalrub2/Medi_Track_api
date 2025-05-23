import mongoose from "mongoose";

const medicationTakenSchema = new mongoose.Schema({
  medicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medication",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  scheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Schedule",
    required: true,
  },
  quantityTaken: {
    type: Number,
    required: true,
  },
  takenAt: {
    type: Date,
    default: Date.now,
  },
});

const MedicationTakenModel = mongoose.model("MedicationTaken", medicationTakenSchema);
 
export default MedicationTakenModel;
