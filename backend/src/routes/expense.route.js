import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  addExpense,
  deleteExpense,
  getAllExpenses,
  getExpensebyId,
  updateExpense,
} from "../controllers/expense.controller.js";

const expenseRoutes = express.Router();

expenseRoutes.post("/add-expense", authMiddleware, addExpense);
expenseRoutes.get("/get-all-expense", authMiddleware, getAllExpenses);
expenseRoutes.put("/update-expense/:expenseId", authMiddleware, updateExpense);
expenseRoutes.delete("/delete-expense/:expenseId", authMiddleware, deleteExpense);
expenseRoutes.get("/:expenseId", authMiddleware, getExpensebyId);

export default expenseRoutes;
