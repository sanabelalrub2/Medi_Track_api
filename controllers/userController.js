const User = require('../models/User');

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

exports.createEmergencyContact = async (req, res) => {
  try {
    const { userId, contact } = req.body;

    if (!userId || !contact) {
      return res.status(400).json({ message: 'User ID and contact are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.emergencyContacts.push(contact);
    await user.save();
    res.status(201).json({ message: 'Contact added' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding contact', error: error.message });
  }
};

exports.updateEmergencyContacts = async (req, res) => {
  try {
    const { userId, contacts } = req.body;

    if (!userId || !Array.isArray(contacts)) {
      return res.status(400).json({ message: 'User ID and contacts array are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.emergencyContacts = contacts;
    await user.save();
    res.json({ message: 'Contacts updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating contacts', error: error.message });
  }
};

exports.getEmergencyContact = async (req, res) => {
  try {
    const user = await User.findOne({ "emergencyContacts._id": req.params.id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const contact = user.emergencyContacts.id(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact', error: error.message });
  }
};

exports.deleteEmergencyContact = async (req, res) => {
  try {
    const user = await User.findOne({ "emergencyContacts._id": req.params.id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const contact = user.emergencyContacts.id(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    contact.remove();
    await user.save();
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact', error: error.message });
  }
};
