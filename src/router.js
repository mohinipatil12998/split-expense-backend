import express from 'express';
import {userRoutes, contactRoutes,expenseRoutes,settlementRoutes,authRoutes} from './routes/index.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/contacts', contactRoutes);
router.use('/expenses', expenseRoutes); 
router.use('/settlements', settlementRoutes);
router.use('/auth', authRoutes);
// Add more routes as needed
// router.use('/your-route', yourRouteHandler);

export {router};