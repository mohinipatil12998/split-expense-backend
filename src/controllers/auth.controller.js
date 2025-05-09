import {
  registerUser,
  loginUser,
  getUserById
} from '../models/user.model.js'
import jwt from 'jsonwebtoken'

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = await registerUser(name, email, password)
    res.status(201).json(user)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const { token, user } = await loginUser(email, password)
    res.json({ token, user })
  } catch (err) {
    res.status(401).json({ message: err.message })
  }
}

const getMe = async (req, res) => {
  try {
    const user = await getUserById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export { register, login, getMe }