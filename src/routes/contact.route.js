import express from 'express'
import { createContactHandler } from '../controllers/contact.controller.js'

const router = express.Router()

router.post('/', createContactHandler)

export default router