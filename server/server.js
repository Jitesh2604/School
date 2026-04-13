import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import admissionRoutes from './routes/admissionRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import activityRoutes from "./routes/activityRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/auth',  authRoutes);
app.use('/api/enquiry', enquiryRoutes);
app.use('/api/admission', admissionRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/gallery", galleryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    try {
        await connectDB();            
        console.log(`Server is running on port ${PORT}`);      
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
  
});