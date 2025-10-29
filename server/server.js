import app from './app.js'; // <-- Import the core app
import cron from 'node-cron';
import Complaint from './models/Complaint.js';

const PORT = process.env.PORT || 5001;

// --- LOCAL-ONLY CRON JOB ---
// This schedule ('0 * * * *') runs at the 0th minute of every hour.
cron.schedule('0 * * * *', async () => {
  console.log('Running LOCAL scheduled job: Deleting resolved complaints older than 24 hours...');
  
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const result = await Complaint.deleteMany({
      status: 'Resolved',
      updatedAt: { $lt: twentyFourHoursAgo }
    });

    if (result.deletedCount > 0) {
      console.log(`Successfully deleted ${result.deletedCount} old resolved complaints.`);
    } else {
      console.log('No old resolved complaints to delete.');
    }
  } catch (error) {
    console.error('Error running scheduled complaint deletion:', error);
  }
});
// --- END OF CRON JOB ---


// --- START THE LOCAL SERVER ---
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));