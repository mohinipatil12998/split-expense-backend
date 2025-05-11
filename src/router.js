import express from "express";
import {
  userRoutes,
  contactRoutes,
  expenseRoutes,
  settlementRoutes,
  authRoutes,
  expenseGroupRoutes,
} from "./routes/index.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/contacts", contactRoutes);
router.use("/expenses", expenseRoutes);
router.use("/settlements", settlementRoutes);
router.use("/auth", authRoutes);
router.use("/expensegroup", expenseGroupRoutes);
// Add more routes as needed
// router.use('/your-route', yourRouteHandler);

export { router };
