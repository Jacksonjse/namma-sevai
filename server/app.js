import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import complaintRoutes from './routes/complaintRoutes.js';

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Body parser for JSON

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

connectDB();

// API Routes
app.get('/', (req, res) => {
  res.send('Namma Sevai API is running...');
});

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);

// DO NOT ADD app.listen() HERE
// We export the app for Vercel and our local server to use
export default app;