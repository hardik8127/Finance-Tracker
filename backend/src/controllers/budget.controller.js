import { db } from "../libs/db.js";

export const setBudget = async (req, res) => {
  try {
    const { category, amount, month, year } = req.body;
    const userId = req.user.id;
    
    if (!category || !amount || !month || !year) {
      return res.status(400).json({
        message: "Category, amount, month, and year are required",
      });
    }

    if (isNaN(amount) || parseFloat(amount) <= 0) {
      return res.status(400).json({
        message: "Amount must be a positive number",
      });
    }

    if (month < 1 || month > 12) {
      return res.status(400).json({
        message: "Month must be in between 1 and 12",
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

    const budget = await db.Budget.upsert({
      where: {
        userId_category_month_year: {
          userId,
          category,
          month: parseInt(month),
          year: parseInt(year),
        },
      },
      update: {
        amount: parseFloat(amount),
      },
      create: {
        userId,
        category,
        amount: parseFloat(amount),
        month: parseInt(month),
        year: parseInt(year),
      },
    });
    res.status(200).json({
      success: true,
      message: "Budget set successfully",
      budget,
    });
  } catch (error) {
    console.error("Error setting budget:", error);
    res.status(500).json({
      success: false,
      message: "Failed to set budget",
    });
  }
};

export const getAllBudgets = async (req, res) => {
  try {
    const userId = req.user.id;
    const { month, year } = req.query;

    const currentDate = new Date();
    const targetMonth = month ? parseInt(month) : currentDate.getMonth() + 1;
    const targetYear = year ? parseInt(year) : currentDate.getFullYear();

    const budgets = await db.Budget.findMany({
      where: {
        userId: userId,
        month: targetMonth,
        year: targetYear,
      },
      orderBy: {
        category: "asc",
      },
    });
    res.status(200).json({
      success: true,
      message:
        budgets.length === 0
          ? "No budgets found"
          : "Budgets fetched successfully",
      budgets,
      month: targetMonth,
      year: targetYear,
    });
  } catch (error) {
    console.error("Error fetching budgets:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch budgets",
    });
  }
};

export const getBudgetById = async (req, res) => {
  try {
    const { budgetId } = req.params;
    const budget = await db.Budget.findUnique({
      where: {
        id: budgetId,
        userId: req.user.id,
      },
    });

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Budget Fetched Successfully",
      budget,
    });
  } catch (error) {
    console.error("Error fetching budget:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch budget",
    });
  }
};

export const getBudgetByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { month, year } = req.query;
    const userId = req.user.id;

    const currentDate = new Date();
    const targetMonth = month ? parseInt(month) : currentDate.getMonth() + 1;
    const targetYear = year ? parseInt(year) : currentDate.getFullYear();

    const budget = await db.Budget.findUnique({
      where: {
        userId_category_month_year: {
          userId,
          category,
          month: targetMonth,
          year: targetYear,
        },
      },
    });

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found for this category",
      });
    }

    res.status(200).json({
      success: true,
      message: "Budget fetched successfully",
      budget,
    });
  } catch (error) {
    console.error("Error fetching budget:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch budget",
    });
  }
};

export const deleteBudget = async (req, res) => {
  try {
    const { budgetId } = req.params;
    const userId = req.user.id;

    // First check if budget exists and belongs to user
    const budget = await db.Budget.findFirst({
      where: {
        id: budgetId,
        userId: userId,
      },
    });

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found or you don't have permission to delete it",
      });
    }

    const deletedBudget = await db.Budget.delete({
      where: {
        id: budgetId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Budget deleted successfully",
      deletedBudget,
    });
  } catch (error) {
    console.error("Error deleting budget:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete budget",
    });
  }
};

export const getBudgetComparison = async (req, res) => {
  try {
    const userId = req.user.id;
    const { month, year } = req.query;

    const currentDate = new Date();
    const targetMonth = month ? parseInt(month) : currentDate.getMonth() + 1;
    const targetYear = year ? parseInt(year) : currentDate.getFullYear();

    // Get all budgets for the month
    const budgets = await db.Budget.findMany({
      where: {
        userId,
        month: targetMonth,
        year: targetYear,
      },
    });

    const startDate = new Date(targetYear, targetMonth - 1, 1);
    const endDate = new Date(targetYear, targetMonth, 0, 23, 59, 59);

    const expenses = await db.Expense.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const expenseByCategory = expenses.reduce((acc, expense) => {
      acc[expense.category] =
        (acc[expense.category] || 0) + parseFloat(expense.amount);
      return acc;
    }, {});

    // Create comparison data
    const comparison = budgets.map((budget) => {
      const spent = expenseByCategory[budget.category] || 0;
      const remaining = parseFloat(budget.amount) - spent;
      const percentageUsed =
        parseFloat(budget.amount) > 0
          ? (spent / parseFloat(budget.amount)) * 100
          : 0;

      return {
        category: budget.category,
        budgetAmount: parseFloat(budget.amount),
        spentAmount: spent,
        remainingAmount: remaining,
        percentageUsed: Math.round(percentageUsed * 100) / 100,
        isOverBudget: spent > parseFloat(budget.amount),
      };
    });

    const totalBudget = budgets.reduce(
      (sum, budget) => sum + parseFloat(budget.amount),
      0
    );
    const totalSpent = Object.values(expenseByCategory).reduce(
      (sum, amount) => sum + amount,
      0
    );
    res.status(200).json({
      success: true,
      message: "Budget comparison fetched successfully",
      data: {
        month: targetMonth,
        year: targetYear,
        categories: comparison,
        summary: {
          totalBudget,
          totalSpent,
          totalRemaining: totalBudget - totalSpent,
          overallPercentageUsed:
            totalBudget > 0
              ? Math.round((totalSpent / totalBudget) * 10000) / 100
              : 0,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching budget comparison:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch budget comparison",
    });
  }
};
