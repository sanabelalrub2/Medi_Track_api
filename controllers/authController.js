const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

exports.register = async (req, res) => {
  const { userName, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ userName, email, password: hashed });
  await user.save();
  res.status(201).json({ message: 'User registered' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json({ token });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found' });

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

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Reset code sent to email' });
  } catch {
    res.status(500).json({ message: 'Failed to send email' });
  }
};

exports.verifyCode = async (req, res) => {
  const { email, code } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.resetCode !== code || Date.now() > user.resetCodeExpire)
    return res.status(400).json({ message: 'Invalid or expired code' });

  res.json({ message: 'Code is valid' });
};

exports.resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.resetCode !== code || Date.now() > user.resetCodeExpire)
    return res.status(400).json({ message: 'Invalid or expired code' });

  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  user.resetCode = undefined;
  user.resetCodeExpire = undefined;
  await user.save();

  res.json({ message: 'Password reset successful' });
};
