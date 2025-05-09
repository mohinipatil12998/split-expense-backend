import { getConnection } from '../config/db.js'

const createContact = async (name, email, subject, message) => {
  const connection = await getConnection()
  const [result] = await connection.execute(
    'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
    [name, email, subject, message]
  )
  return result.insertId
}

export { createContact }