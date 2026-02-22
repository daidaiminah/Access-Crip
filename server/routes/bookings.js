import express from 'express';
import { body } from 'express-validator';
import {
  createBooking,
  getCustomerBookings,
  getOwnerBookings,
  updateBookingStatus
} from '../controllers/bookingController.js';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.js';
import { validateRequest } from '../middlewares/validation.js';

const router = express.Router();

// Validation rules
const bookingValidation = [
  body('propertyId').isUUID().withMessage('Valid property ID is required'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').isISO8601().withMessage('Valid end date is required'),
  body('guests').optional().isInt({ min: 1 }).withMessage('Guests must be at least 1')
];

const statusValidation = [
  body('status').isIn(['pending', 'confirmed', 'cancelled', 'completed']).withMessage('Invalid status')
];

// Routes
router.post('/', authMiddleware, roleMiddleware(['customer']), bookingValidation, validateRequest, createBooking);
router.get('/customer', authMiddleware, roleMiddleware(['customer']), getCustomerBookings);
router.get('/owner', authMiddleware, roleMiddleware(['owner']), getOwnerBookings);
router.patch('/:id/status', authMiddleware, statusValidation, validateRequest, updateBookingStatus);

export default router;