const express = require('express');
const router = express.Router();
const medicationController = require('../controllers/medicationController');

// Get all medications for a user
router.get('/', medicationController.getAllMedications);

// Get medications that are out of stock for a user
router.get('/cart', medicationController.getOutOfStockMedications);

// Get medication by medicationId
router.get('/:id', medicationController.getMedicationById);

// Create new medication
router.post('/', medicationController.createMedication);

// Update medication
router.put('/:id', medicationController.updateMedication);

// Delete medication
router.delete('/:id', medicationController.deleteMedication);

module.exports = router;
