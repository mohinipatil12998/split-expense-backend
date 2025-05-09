import jwt from 'jsonwebtoken'
import { getConnection } from '../config/db.js'

const protect = async (req, res, next) => {
  let token
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }
  
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' })
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    const connection = await getConnection()
    const [users] = await connection.execute(
      'SELECT id, name, email FROM users WHERE id = ?',
      [decoded.id]
    )
    
    if (users.length === 0) {
      return res.status(401).json({ message: 'Not authorized, user not found' })
    }
    
    req.user = users[0]
    next()
  } catch (err) {
    res.status(401).json({ message: 'Not authorized, token failed' })
  }
}

export { protect }