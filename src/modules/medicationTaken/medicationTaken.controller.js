

import MedicationTakenModel from "../../../DB/models/medicationTaken.model.js";


export const getAllMedicationTaken = async (req, res) => {
  const records = await MedicationTakenModel.find();
  res.json({ message: "Done", records });
};

export const createMedicationTaken = async (req, res) => {
  const record = await MedicationTakenModel.create(req.body);
  res.json({ message: "Created", record });
};

export const updateMedicationTaken = async (req, res) => {
  const { id } = req.params;
  const updated = await MedicationTakenModel.findByIdAndUpdate(id, req.body, { new: true });
  res.json({ message: "Updated", updated });
};

export const deleteMedicationTaken = async (req, res) => {
  const { id } = req.params;
  await MedicationTakenModel.findByIdAndDelete(id);
  res.json({ message: "Deleted" });
};

export const getMedicationTakenInRange = async (req, res) => {
  const { startDate, endDate } = req.query;
  const records = await MedicationTakenModel.find({
    takenAt: {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    },
  });
  res.json({ message: "Done", records });
};
