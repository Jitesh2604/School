import express from 'express';
import { createEnquiry, getEnquiries, deleteEnquiry } from '../controllers/enquiryController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', createEnquiry);
router.get('/', authMiddleware, getEnquiries);
router.delete('/:id', authMiddleware, deleteEnquiry);

export default router;  