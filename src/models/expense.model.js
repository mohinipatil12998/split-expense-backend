import { getConnection } from '../config/db.js'

const createExpense = async (userId, description, amount, category) => {
  const connection = await getConnection()
  const [result] = await connection.execute(
    'INSERT INTO expenses (userId, description, amount, category) VALUES (?, ?, ?, ?)',
    [userId, description, amount, category]
  )
  return getExpenseById(result.insertId)
}

const getExpenseById = async (id) => {
  const connection = await getConnection()
  const [expenses] = await connection.execute(
    'SELECT * FROM expenses WHERE id = ?',
    [id]
  )
  return expenses[0]
}

const getExpensesByUser = async (userId) => {
  const connection = await getConnection()
  const [expenses] = await connection.execute(
    'SELECT * FROM expenses WHERE userId = ? ORDER BY date DESC',
    [userId]
  )
  return expenses
}

const updateExpense = async (id, userId, description, amount, category) => {
  const connection = await getConnection()
  await connection.execute(
    'UPDATE expenses SET description = ?, amount = ?, category = ? WHERE id = ? AND userId = ?',
    [description, amount, category, id, userId]
  )
  return getExpenseById(id)
}

const deleteExpense = async (id, userId) => {
  const connection = await getConnection()
  await connection.execute(
    'DELETE FROM expenses WHERE id = ? AND userId = ?',
    [id, userId]
  )
}

export {
  createExpense,
  getExpensesByUser,
  updateExpense,
  deleteExpense
}