import { createContact } from '../models/contact.model.js'

const createContactHandler = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body
    await createContact(name, email, subject, message)
    res.status(201).json({ message: 'Contact form submitted successfully' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export { createContactHandler }