import { getConnection } from '../config/db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const registerUser = async (name, email, password) => {
  const connection = await getConnection()
  
  // Check if user already exists
  const [existing] = await connection.execute(
    'SELECT * FROM users WHERE email = ?',
    [email]
  )
  
  if (existing.length > 0) {
    throw new Error('User already exists')
  }
  
  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  
  // Create user
  const [result] = await connection.execute(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword]
  )
  
  return {
    id: result.insertId,
    name,
    email,
  }
}

const loginUser = async (email, password) => {
  const connection = await getConnection()
  
  // Check if user exists
  const [users] = await connection.execute(
    'SELECT * FROM users WHERE email = ?',
    [email]
  )
  
  if (users.length === 0) {
    throw new Error('Invalid credentials')
  }
  
  const user = users[0]
  
  // Check password
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Invalid credentials')
  }
  
  // Create and return token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )
  
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  }
}

const getUserById = async (id) => {
  const connection = await getConnection()
  const [users] = await connection.execute(
    'SELECT id, name, email FROM users WHERE id = ?',
    [id]
  )
  return users[0]
}

const getAllUsers = async () => {
  const connection = await getConnection()
  const [users] = await connection.execute(
    'SELECT id, name, email FROM users'
  )
  return users
}

export {
  registerUser,
  loginUser,
  getUserById,
  getAllUsers
}