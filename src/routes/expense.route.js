import express from 'express';
import {
  createExpenseHandler,
  getExpensesHandler,
  updateExpenseHandler,
  deleteExpenseHandler,
  splitExpenseHandler, // Import the split expense handler
} from '../controllers/expense.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Routes for general expenses
router
  .route('/')
  .post(protect, createExpenseHandler)
  .get(protect, getExpensesHandler);

router
  .route('/:id')
  .put(protect, updateExpenseHandler)
  .delete(protect, deleteExpenseHandler);

// Route for splitting an expense
router.route('/split_expense').post(protect, splitExpenseHandler);

export default router;