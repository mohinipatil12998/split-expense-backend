import {
  createExpense,
  getExpensesByUser,
  updateExpense,
  deleteExpense
} from '../models/expense.model.js'

const createExpenseHandler = async (req, res) => {
  try {
    const { description, amount, category } = req.body
    const expense = await createExpense(req.user.id, description, amount, category)
    res.status(201).json(expense)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const getExpensesHandler = async (req, res) => {
  try {
    const expenses = await getExpensesByUser(req.user.id)
    res.json(expenses)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const updateExpenseHandler = async (req, res) => {
  try {
    const { id } = req.params
    const { description, amount, category } = req.body
    const expense = await updateExpense(id, req.user.id, description, amount, category)
    res.json(expense)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const deleteExpenseHandler = async (req, res) => {
  try {
    const { id } = req.params
    await deleteExpense(id, req.user.id)
    res.json({ message: 'Expense deleted successfully' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export {
  createExpenseHandler,
  getExpensesHandler,
  updateExpenseHandler,
  deleteExpenseHandler
}