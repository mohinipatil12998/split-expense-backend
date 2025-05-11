import express from 'express';
import {
  createExpenseHandler,
  getExpensesHandler,
  updateExpenseHandler,
  deleteExpenseHandler,
  // getExpensesByGroupHandler, // New handler for group-specific expenses
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

// Route to get expenses by group
// router.route('/expensegroup/:groupId').get(protect, getExpensesByGroupHandler);

export default router;