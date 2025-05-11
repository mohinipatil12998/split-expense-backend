import {
  createExpense,
  getExpensesByUser,
  updateExpense,
  deleteExpense
} from '../models/expense.model.js'

const createSplitExpenseHandler = async (req, res) => {
  try {
    const { description, amount, category } = req.body
    const expense = await createSplitExpense(req.user.id, description, amount, category)
    res.status(201).json(expense)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const getSplitExpensesHandler = async (req, res) => {
  try {
    const expenses = await getSplitExpensesByUser(req.user.id)
    res.json(expenses)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const updateSplitExpenseHandler = async (req, res) => {
  try {
    const { id } = req.params
    const { description, amount, category } = req.body
    const expense = await updateSplitExpense(id, req.user.id, description, amount, category)
    res.json(expense)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const deleteSplitExpenseHandler = async (req, res) => {
  try {
    const { id } = req.params
    await deleteSplitExpense(id, req.user.id)
    res.json({ message: 'Expense deleted successfully' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export {
  createSplitExpenseHandler,
  getSplitExpensesHandler,
  updateSplitExpenseHandler,
  deleteSplitExpenseHandler
}