import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import complaintRoutes from './routes/complaintRoutes.js';

// NOTE: We've removed node-cron and the Complaint model import
// Vercel will handle cron jobs via vercel.json

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Body parser for JSON

// Connect to MongoDB
// We must check if a connection already exists, as serverless functions
// can re-use connections.
if (!mongoose.connection.readyState) {
  connectDB();
}

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

// API Routes
app.get('/', (req, res) => {
  res.send('Namma Sevai API is running...');
});

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);

// --- CRITICAL CHANGE ---
// We no longer call app.listen()
// We export the 'app' for Vercel to use
export default app;