import express from 'express';
import { upload, uploadSingleImage, uploadMultipleImages, deleteImage } from '../controllers/uploadController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

// Upload single image
router.post('/single', authenticate, upload.single('image'), uploadSingleImage);

// Upload multiple images (max 10)
router.post('/multiple', authenticate, upload.array('images', 10), uploadMultipleImages);

// Delete image
router.delete('/:filename', authenticate, deleteImage);

export default router;
