const express = require('express');
const {
  getUser,
  createEmergencyContact,
  updateEmergencyContacts,
  getEmergencyContact,
  deleteEmergencyContact
} = require('../controllers/userController');

const router = express.Router();

router.get('/:id', getUser);
router.post('/emergencyContact', createEmergencyContact);
router.put('/emergencyContact', updateEmergencyContacts);
router.get('/emergencyContact/:id', getEmergencyContact);
router.delete('/emergencyContact/:id', deleteEmergencyContact);

module.exports = router;
