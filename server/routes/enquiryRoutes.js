import express from 'express';
import { createEnquiry, getEnquiries, deleteEnquiry, updateEnquiryStatus } from '../controllers/enquiryController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createEnquiry);
router.get('/', authMiddleware, getEnquiries);
router.delete('/:id', authMiddleware, deleteEnquiry);
router.patch('/:id', authMiddleware, updateEnquiryStatus);

export default router;  