import express from 'express';
import { userRoutes, contactRoutes, expenseRoutes, settlementRoutes, authRoutes, groupRoutes } from './routes/index.js'; // Import groupRoutes

const router = express.Router();

router.use('/users', userRoutes);
router.use('/contacts', contactRoutes);
router.use('/expenses', expenseRoutes);
router.use('/settlements', settlementRoutes);
router.use('/auth', authRoutes);
router.use('/groups', groupRoutes); // Add group routes

// Add more routes as needed
// router.use('/your-route', yourRouteHandler);

export { router };