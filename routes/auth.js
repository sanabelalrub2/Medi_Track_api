const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'Registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while registering', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(200).json({
      message: 'Successfully logged in',
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while logging in', error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const resetCode = crypto.randomBytes(3).toString('hex');
    user.resetCode = resetCode;
    user.resetCodeExpire = Date.now() + 10 * 60 * 1000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-app-password'
      }
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Password Reset Code',
      text: `Your reset code is: ${resetCode}`
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Reset code sent to email' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
};

const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.resetCode !== code || Date.now() > user.resetCodeExpire) {
      return res.status(400).json({ message: 'Invalid or expired code' });
    }

    res.json({ message: 'Code is valid' });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying code', error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.resetCode !== code || Date.now() > user.resetCodeExpire) {
      return res.status(400).json({ message: 'Invalid or expired code' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(newPassword, salt);

    user.password = hashed;
    user.resetCode = undefined;
    user.resetCodeExpire = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password', error: error.message });
  }
};

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/verify-code', verifyCode);
router.post('/reset-password', resetPassword);

module.exports = router;
