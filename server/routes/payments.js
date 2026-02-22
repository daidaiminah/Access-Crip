import express from 'express';
import { body } from 'express-validator';
import { initiatePayment, confirmPayment } from '../controllers/paymentController.js';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.js';
import { validateRequest } from '../middlewares/validation.js';

const router = express.Router();

// Validation rules
const initiatePaymentValidation = [
  body('bookingId').isUUID().withMessage('Valid booking ID is required'),
  body('method').isIn(['orange_money', 'momo_pay', 'credit_card']).withMessage('Invalid payment method'),
  body('phoneNumber').if(body('method').isIn(['orange_money', 'momo_pay'])).isMobilePhone().withMessage('Valid phone number is required for mobile payments')
];

const confirmPaymentValidation = [
  body('transactionId').notEmpty().withMessage('Transaction ID is required'),
  body('confirmationCode').notEmpty().withMessage('Confirmation code is required')
];

// Routes
router.post('/initiate', authMiddleware, roleMiddleware(['customer']), initiatePaymentValidation, validateRequest, initiatePayment);
router.post('/confirm', authMiddleware, roleMiddleware(['customer']), confirmPaymentValidation, validateRequest, confirmPayment);

export default router;