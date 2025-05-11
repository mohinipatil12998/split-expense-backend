import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  createExpenseGroupHandler,
  deleteExpenseGroupHandler,
  getExpenseGroupsHandler,
  updateExpenseGroupHandler,
} from "../controllers/expensegroup.controller.js";

const router = express.Router();

router.post('/', protect, createExpenseGroupHandler);
router.get('/', protect, getExpenseGroupsHandler);
router.put('/:id', protect, updateExpenseGroupHandler);
router.delete('/:id', protect, deleteExpenseGroupHandler);

export default router;
