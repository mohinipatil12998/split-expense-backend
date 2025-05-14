import { createExpense, deleteExpense, getExpensesByUser, createSplitExpense, updateExpense } from '../models/expense.model.js';

export const createExpenseHandler = async (req, res) => {
  const { userId, description, amount, category } = req.body;

  if (!userId || !description || !amount || !category) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const expense = await createExpense(userId, description, amount, category);
    res.status(201).json({ message: 'Expense created successfully', expense });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating expense', error });
  }
};

export const deleteExpenseHandler = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!id || !userId) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    await deleteExpense(id, userId);
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting expense', error });
  }
};

export const getExpensesHandler = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const expenses = await getExpensesByUser(userId);
    res.status(200).json({ expenses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching expenses', error });
  }
};

export const splitExpenseHandler = async (req, res) => {
  const { expenseId, totalAmount, participants, splitAmount } = req.body;

  if (!expenseId || !totalAmount || !participants || !splitAmount) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    await createSplitExpense(expenseId, totalAmount, participants, splitAmount);
    res.status(201).json({ message: 'Split expense saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving split expense', error });
  }
};

// Add the updateExpenseHandler function
export const updateExpenseHandler = async (req, res) => {
  const { id } = req.params;
  const { userId, description, amount, category } = req.body;

  if (!id || !userId || !description || !amount || !category) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const updatedExpense = await updateExpense(id, userId, description, amount, category);
    res.status(200).json({ message: 'Expense updated successfully', updatedExpense });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating expense', error });
  }
};