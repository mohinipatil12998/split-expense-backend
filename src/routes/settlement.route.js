import express from 'express'
import {
  createSettlementHandler,
  getSettlementsHandler
} from '../controllers/settlement.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.route('/')
  .post(protect, createSettlementHandler)
  .get(protect, getSettlementsHandler)

export default router