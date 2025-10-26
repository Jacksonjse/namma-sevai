import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import Complaint from '../models/Complaint.js';

const router = express.Router();

// @desc    Create new complaint
// @route   POST /api/complaints
// @access  Private (Any logged-in user)
router.post('/', protect, async (req, res) => { // 'authorize' middleware removed
  const { title, description, category, imageUrl } = req.body;

  try {
    const complaint = await Complaint.create({
      user: req.user.id,
      title,
      description,
      category,
      imageUrl,
    });
    res.status(201).json({ success: true, data: complaint });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @desc    Get user's complaints (REMOVED)
// @route   GET /api/complaints/my
// This route is no longer needed.

// @desc    Get all complaints
// @route   GET /api/complaints/all
// @access  Private (Any logged-in user)
router.get('/all', protect, async (req, res) => { // 'authorize' middleware removed
  try {
    // Populate user info (name and email) for each complaint
    const complaints = await Complaint.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: complaints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @desc    Update complaint status (by admin)
// @route   PUT /api/complaints/:id
// @access  Private (Admin ONLY)
// --- THIS STAYS THE SAME - ONLY ADMINS CAN UPDATE STATUS ---
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  const { status } = req.body;

  // Simple validation for status
  if (!['Pending', 'In Progress', 'Resolved'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status value' });
  }

  try {
    let complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }

    complaint.status = status;
    complaint.updatedAt = Date.now();
    await complaint.save();

    res.status(200).json({ success: true, data: complaint });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }

  // --- NEW ROUTE FOR VERCEL CRON JOB ---
// @desc    Deletes old resolved complaints (called by Vercel)
// @route   GET /api/complaints/auto-delete-resolved
// @access  Public (but only Vercel should know this URL)
router.get('/auto-delete-resolved', async (req, res) => {
    console.log('Running scheduled job: Deleting resolved complaints older than 24 hours...');
    
    try {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  
      const result = await Complaint.deleteMany({
        status: 'Resolved',
        updatedAt: { $lt: twentyFourHoursAgo } // $lt means "less than"
      });
  
      const message = `Successfully deleted ${result.deletedCount} old resolved complaints.`;
      console.log(message);
      res.status(200).json({ success: true, message });
      
    } catch (error) {
      console.error('Error running scheduled complaint deletion:', error);
      res.status(500).json({ success: false, message: 'Cron job failed' });
    }
  });
});

export default router;