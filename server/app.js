import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Make sure cors is imported
import mongoose from 'mongoose';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import complaintRoutes from './routes/complaintRoutes.js';

// Load env vars
dotenv.config();

const app = express();

// --- NEW CORS CONFIGURATION ---
// This tells your backend to accept requests from your local
// frontend AND your future live Vercel frontend.
const whitelist = [
  'https://namma-sevai.vercel.app',
  process.env.CLIENT_ORIGIN_URL 
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      // Allow if origin is in whitelist OR if it's not a browser (e.g., Postman)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
// --- END OF NEW CORS CONFIG ---

// Middleware
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

export default app;