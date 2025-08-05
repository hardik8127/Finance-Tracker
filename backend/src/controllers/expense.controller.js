import { db } from "../libs/db.js";

export const addExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    const userId = req.user.id;
    if (!amount || !category) {
      return res.status(400).json({
        message: " Amount & Category are required",
      });
    }
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      return res.status(400).json({
        message: "Amount must be a positive number",
      });
    }
    const validCategories = [
      "Food",
      "Travel",
      "Entertainment",
      "Shopping",
      "Bills",
      "Healthcare",
      "Others",
    ];

    if (!validCategories.includes(category)) {
      return res.status(400).json({
        message: "Invalid category",
      });
    }

    const expense = await db.Expense.create({
      data: {
        amount: parseFloat(amount),
        description: description,
        category,
        userId,
      },
    });

    res.status(201).json({
      success: true,
      message: "Expense Added Successfully",
      expense,
    });
  } catch (error) {
    console.error("Error in Adding Expense:", error);
    res.status(500).json({ error: "Failed to Add Expense" });
  }
};

export const getExpensebyId = async (req, res) => {
  try {
    const { expenseId } = req.params;

    const expense = await db.Expense.findUnique({
      where: { id: expenseId, userId: req.user.id },
    });
    if (!expense) {
      return res.status(400).json({
        message: "Expense Doesn't Exist",
      });
    }
    res.status(200).json({
      success: true,
      message: "Expense fetched successfully",
      expense,
    });
  } catch (error) {
    console.error("Error in fetching expense:", error);
    res.status(500).json({ error: "Failed to fetch expense" });
  }
};

export const getAllExpenses = async (req, res) => {
  try {
    const userId = req.user.id;
    const { category, startDate, endDate, page = 1, limit = 10 } = req.query;

    // Build where clause with filters
    const where = { userId };

    // Category filter
    if (category) {
      where.category = category;
    }

    // Date range filter
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate);
      if (endDate) where.date.lte = new Date(endDate);
    }

    // Get total count for pagination
    const total = await db.Expense.count({ where });

    // Get expenses with pagination and sorting
    const expenses = await db.Expense.findMany({
      where,
      orderBy: { date: "desc" }, // Latest expenses first
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit),
    });

    res.status(200).json({
      success: true,
      message:
        total === 0 ? "No expenses found" : "Expenses fetched successfully",
      expenses,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalExpenses: total,
        hasNextPage: parseInt(page) < Math.ceil(total / parseInt(limit)),
        hasPrevPage: parseInt(page) > 1,
      },
    });
  } catch (error) {
    console.error("Error in fetching expenses:", error);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const { amount, description, category } = req.body;

    // Check if expense exists and belongs to user
    const expense = await db.Expense.findUnique({
      where: { id: expenseId, userId: req.user.id },
    });
    if (!expense) {
      return res.status(404).json({
        message:
          "Expense doesn't exist or you don't have permission to update it",
      });
    }

    // Validate amount if provided
    if (amount && (isNaN(amount) || parseFloat(amount) <= 0)) {
      return res.status(400).json({
        message: "Amount must be a positive number",
      });
    }

    // Validate category if provided
    if (category) {
      const validCategories = [
        "Food",
        "Travel",
        "Entertainment",
        "Shopping",
        "Bills",
        "Healthcare",
        "Others",
      ];

      if (!validCategories.includes(category)) {
        return res.status(400).json({
          message: "Invalid category",
        });
      }
    }

    const updatedExpense = await db.Expense.update({
      where: { id: expenseId },
      data: {
        ...(amount && { amount: parseFloat(amount) }),
        ...(description !== undefined && { description }),
        ...(category && { category }),
      },
    });

    res.status(200).json({
      success: true,
      message: "Expense Updated Successfully",
      expense: updatedExpense,
    });
  } catch (error) {
    console.error("Error while updating Expense ", error);
    return res.status(500).json({
      success: false,
      message: "Error while updating Expense",
    });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const deletedExpense = await db.Expense.delete({
      where: { id: expenseId, userId: req.user.id },
    });
    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
      deletedExpense,
    });
  } catch (error) {
    console.error("Error in deleting Expense", error);
    res.status(500).json({
      success: false,
      message: "Failed to Delete Expense",
    });
  }
};
