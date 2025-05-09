import express from 'express'
import {
  createExpenseHandler,
  getExpensesHandler,
  updateExpenseHandler,
  deleteExpenseHandler
} from '../controllers/expense.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.route('/')
  .post(protect, createExpenseHandler)
  .get(protect, getExpensesHandler)

router.route('/:id')
  .put(protect, updateExpenseHandler)
  .delete(protect, deleteExpenseHandler)

export default router