import express from 'express';
import { body } from 'express-validator';
import {
  createReview,
  getPropertyReviews,
  updateReview,
  deleteReview
} from '../controllers/reviewController.js';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.js';
import { validateRequest } from '../middlewares/validation.js';

const router = express.Router();

// Validation rules
const reviewValidation = [
  body('propertyId').isUUID().withMessage('Valid property ID is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().trim().isLength({ max: 1000 }).withMessage('Comment must not exceed 1000 characters')
];

const updateReviewValidation = [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().trim().isLength({ max: 1000 }).withMessage('Comment must not exceed 1000 characters')
];

// Routes
router.post('/', authMiddleware, roleMiddleware(['customer']), reviewValidation, validateRequest, createReview);
router.get('/property/:propertyId', getPropertyReviews);
router.put('/:id', authMiddleware, roleMiddleware(['customer']), updateReviewValidation, validateRequest, updateReview);
router.delete('/:id', authMiddleware, roleMiddleware(['customer', 'admin']), deleteReview);

export default router;