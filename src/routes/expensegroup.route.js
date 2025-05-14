import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  createExpenseGroupHandler,
  deleteExpenseGroupHandler,
  getExpenseGroupsHandler,
  updateExpenseGroupHandler,
  getExpenseGroupUserHandler,
  addIntoExpenseGroupHandler,
  getGroupUsersWithDetailsHanlder
} from "../controllers/expensegroup.controller.js";

const router = express.Router();

router.post('/', protect, createExpenseGroupHandler);
router.get('/group/:group_id/members', protect, getExpenseGroupUserHandler);
router.post('/addmember', protect, addIntoExpenseGroupHandler)
router.get('/:user_id', protect, getGroupUsersWithDetailsHanlder);
router.put('/:id', protect, updateExpenseGroupHandler);
router.delete('/:id', protect, deleteExpenseGroupHandler);

export default router;
