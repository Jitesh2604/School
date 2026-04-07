import express from 'express';
import { createEnquiry, getEnquiries, deleteEnquiry } from '../controllers/enquirtController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', createEnquiry);
router.get('/', protect, getEnquiries);
router.delete('/:id', protect, deleteEnquiry);

export default router;  