import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  deleteBudget,
  getAllBudgets,
  getBudgetByCategory,
  getBudgetById,
  getBudgetComparison,
  setBudget,
} from "../controllers/budget.controller.js";

const budgetRoutes = express.Router();

budgetRoutes.post("/set-budget", authMiddleware, setBudget);
budgetRoutes.get("/get-all-budgets", authMiddleware, getAllBudgets);
budgetRoutes.get("/category/:category", authMiddleware, getBudgetByCategory);
budgetRoutes.get("/comparison", authMiddleware, getBudgetComparison);
budgetRoutes.get("/:budgetId", authMiddleware, getBudgetById);
budgetRoutes.delete("/delete/:budgetId", authMiddleware, deleteBudget);

export default budgetRoutes;
