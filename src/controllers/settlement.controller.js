import {
  createSettlement,
  getSettlementsByUser
} from '../models/settlement.model.js'

const createSettlementHandler = async (req, res) => {
  try {
    const { amount, toUser } = req.body
    const settlement = await createSettlement(req.user.id, toUser, amount)
    res.status(201).json(settlement)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const getSettlementsHandler = async (req, res) => {
  try {
    const settlements = await getSettlementsByUser(req.user.id)
    res.json(settlements)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export { createSettlementHandler, getSettlementsHandler }