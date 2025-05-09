import express from 'express';
import { connectDB } from './config/db.js'
import {router as apiRouter}  from '../src/router.js';

// PORT NUMBER 
const port = process.env.PORT || 5000

// CREATE EXPRESS APP
const  app = express();

// MIDDLEWARES for parsing JSON and URL-encoded data
// This middleware is used to parse incoming requests with JSON payloads
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// BINDS THE APP TO ALL ROUTES
app.use('/api', apiRouter)

// Connect to database
connectDB()

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})