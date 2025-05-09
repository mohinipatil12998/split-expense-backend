import { getConnection } from '../config/db.js'

const createSettlement = async (fromUserId, toUserId, amount) => {
  const connection = await getConnection()
  const [result] = await connection.execute(
    'INSERT INTO settlements (fromUserId, toUserId, amount) VALUES (?, ?, ?)',
    [fromUserId, toUserId, amount]
  )
  return getSettlementById(result.insertId)
}

const getSettlementById = async (id) => {
  const connection = await getConnection()
  const [settlements] = await connection.execute(
    'SELECT * FROM settlements WHERE id = ?',
    [id]
  )
  return settlements[0]
}

const getSettlementsByUser = async (userId) => {
  const connection = await getConnection()
  const [settlements] = await connection.execute(
    `SELECT s.*, u1.name as fromUserName, u2.name as toUserName 
     FROM settlements s
     JOIN users u1 ON s.fromUserId = u1.id
     JOIN users u2 ON s.toUserId = u2.id
     WHERE s.fromUserId = ? OR s.toUserId = ?
     ORDER BY s.date DESC`,
    [userId, userId]
  )
  return settlements
}

export {
  createSettlement,
  getSettlementsByUser
}