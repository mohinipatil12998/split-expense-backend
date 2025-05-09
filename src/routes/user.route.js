import express from 'express'
import { getUsersHandler } from '../controllers/user.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/', protect, getUsersHandler)

export default router