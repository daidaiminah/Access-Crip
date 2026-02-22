import express from 'express';
import {
  getUsers,
  toggleUserStatus,
  getPendingProperties,
  approveProperty,
  rejectProperty,
  getDashboardStats
} from '../controllers/adminController.js';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.js';

const router = express.Router();

// All admin routes require admin role
router.use(authMiddleware, roleMiddleware(['admin']));

// Routes
router.get('/stats', getDashboardStats);
router.get('/users', getUsers);
router.patch('/users/:id/toggle-status', toggleUserStatus);
router.get('/properties/pending', getPendingProperties);
router.patch('/properties/:id/approve', approveProperty);
router.delete('/properties/:id/reject', rejectProperty);

export default router;