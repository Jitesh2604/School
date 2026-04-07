import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes.js';
import { authMiddleware } from './middlewares/authMiddleware';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/auth', authMiddleware,  authRoutes);

app.listen(PORT, async () => {
    try {
        await connectDB();            
        console.log(`Server is running on port ${PORT}`);      
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
  
});