 const Medication = require('../DB/models/Medication');

// Get all medications for a user
exports.getAllMedications = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    const meds = await Medication.find({ userId });
    res.json(meds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get medication by medicationId
exports.getMedicationById = async (req, res) => {
  try {
    const med = await Medication.findById(req.params.id);
    if (!med) {
      return res.status(404).json({ error: 'Medication not found' });
    }
    res.json(med);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create new medication
exports.createMedication = async (req, res) => {
  try {
    const { userId, name, totalQuantity, status, remainingQuantity, sideEffect, note } = req.body;

    if (!userId || !name || !totalQuantity || !status || !remainingQuantity) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newMedication = new Medication({
      userId,
      name,
      totalQuantity,
      status,
      remainingQuantity,
      sideEffect,
      note
    });

    const med = await newMedication.save();
    res.status(201).json(med);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update medication
exports.updateMedication = async (req, res) => {
  try {
    const med = await Medication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!med) {
      return res.status(404).json({ error: 'Medication not found' });
    }
    res.json(med);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete medication
exports.deleteMedication = async (req, res) => {
  try {
    const med = await Medication.findByIdAndDelete(req.params.id);
    if (!med) {
      return res.status(404).json({ error: 'Medication not found' });
    }
    res.json({ message: 'Medication deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get out-of-stock medications
exports.getOutOfStockMedications = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    const meds = await Medication.find({ userId, status: 'out_of_stock' });
    res.json(meds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
