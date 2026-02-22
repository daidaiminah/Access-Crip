import express from 'express';
import { body } from 'express-validator';
import {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getOwnerProperties
} from '../controllers/propertyController.js';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.js';
import { validateRequest } from '../middlewares/validation.js';

const router = express.Router();

// Validation rules
const propertyValidation = [
  body('title').trim().isLength({ min: 5, max: 200 }).withMessage('Title must be between 5 and 200 characters'),
  body('description').trim().isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('type').isIn(['house', 'apartment', 'room', 'hotel', 'motel', 'event_center']).withMessage('Invalid property type'),
  body('bedrooms').optional().isInt({ min: 1 }).withMessage('Bedrooms must be at least 1'),
  body('bathrooms').optional().isInt({ min: 1 }).withMessage('Bathrooms must be at least 1'),
  body('maxGuests').optional().isInt({ min: 1 }).withMessage('Max guests must be at least 1')
];

// Routes
router.get('/', getProperties);
router.get('/owner', authMiddleware, roleMiddleware(['owner']), getOwnerProperties);
router.get('/:id', getProperty);
router.post('/', authMiddleware, roleMiddleware(['owner']), propertyValidation, validateRequest, createProperty);
router.put('/:id', authMiddleware, roleMiddleware(['owner']), propertyValidation, validateRequest, updateProperty);
router.delete('/:id', authMiddleware, roleMiddleware(['owner', 'admin']), deleteProperty);

export default router;