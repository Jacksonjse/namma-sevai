import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Helper to sign JWT
const getSignedJwtToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register user or admin
// @route   POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Basic validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }

    // --- ADMIN-ONLY VALIDATION ---
    // This logic checks the email ONLY if the role is 'admin'
    if (role === 'admin' && !email.endsWith('@karunya.edu.in')) {
      return res.status(400).json({ 
        success: false, 
        message: 'Admin registration is only allowed for @karunya.edu.in emails.' 
      });
    }
    // --- END OF NEW LOGIC ---

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create user
    user = await User.create({
      name,
      email,
      password,
      role, // Role comes from the frontend (user or admin)
    });

    const token = getSignedJwtToken(user._id, user.role);
    res.status(201).json({ success: true, token, role: user.role });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @desc    Login user or admin
// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password' });
  }

  try {
    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = getSignedJwtToken(user._id, user.role);
    res.status(200).json({ success: true, token, role: user.role });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

export default router;