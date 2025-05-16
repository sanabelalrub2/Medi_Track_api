import userModel from "../../../DB/models/user.model.js";
 //Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "User ID is required" });

    const user = await userModel.findById(id).select("-password -sendCode");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }

  
};

// Create emergency contact
 

  

export const createEmergencyContact = async (req, res) => {
  try {
    const { userId, name, relationship, phone, email } = req.body;
 
    if (!userId || !name) {
      return res.status(400).json({ message: "userId and name are required" });
    }
 
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

  
    const newContact = { name, relationship, phone, email };
    user.emergencyContacts.push(newContact);

    
    await user.save();

    return res.status(201).json({
      message: "Emergency contact added successfully",
      contact: user.emergencyContacts.at(-1),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



// PUT Update emergency contact
export const updateEmergencyContact = async (req, res) => {
  try {
    const { userId, contactId, name, relationship, phone, email } = req.body;

    if (!userId || !contactId) {
      return res.status(400).json({ message: "userId and contactId are required" });
    }

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const contact = user.emergencyContacts.id(contactId);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    if (name) contact.name = name;
    if (relationship) contact.relationship = relationship;
    if (phone) contact.phone = phone;
    if (email) contact.email = email;

    await user.save();

    res.status(200).json({ message: "Contact updated", contact });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



export const getEmergencyContact = async (req, res) => {
  try {
    const { userId, contactId } = req.params; // لازم تمرر userId و contactId في الـ URL

    if (!userId || !contactId) {
      return res.status(400).json({ message: "userId and contactId are required" });
    }

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const contact = user.emergencyContacts.id(contactId);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    res.status(200).json({ contact });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


//   Delete emergency contact by ID
export const deleteEmergencyContact = async (req, res) => {
  try {
    const { id: contactId } = req.params;
    const { userId } = req.query;  

    if (!userId || !contactId) {
      return res.status(400).json({ message: "userId and contactId are required" });
    }

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const initialCount = user.emergencyContacts.length;
    user.emergencyContacts = user.emergencyContacts.filter(
      (contact) => contact._id.toString() !== contactId
    );

    if (user.emergencyContacts.length === initialCount) {
      return res.status(404).json({ message: "Contact not found" });
    }

    await user.save();

    res.status(200).json({ message: "Contact deleted", contacts: user.emergencyContacts });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
