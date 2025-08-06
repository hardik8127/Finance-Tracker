import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useExpenseStore = create((set, get) => ({
  expenses: [],
  isLoading: false,
  isAddingExpense: false,
  isUpdatingExpense: false,
  isDeletingExpense: false,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalExpenses: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },

  // Get all expenses with filters
  getExpenses: async (filters = {}) => {
    set({ isLoading: true });
    try {
      const params = new URLSearchParams();
      
      // Add filters to params
      if (filters.category) params.append('category', filters.category);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      if (filters.page) params.append('page', filters.page);
      if (filters.limit) params.append('limit', filters.limit);

      const res = await axiosInstance.get(`/expense/get-all-expense?${params}`);
      
      set({ 
        expenses: res.data.expenses,
        pagination: res.data.pagination,
        isLoading: false 
      });
      return { success: true, data: res.data };
    } catch (error) {
      set({ isLoading: false });
      const errorMessage = error.response?.data?.message || "Failed to fetch expenses";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // Add new expense
  addExpense: async (expenseData) => {
    set({ isAddingExpense: true });
    try {
      const res = await axiosInstance.post("/expense/add-expense", expenseData);
      
      // Optimistically update the UI
      const newExpense = res.data.expense;
      set(state => ({ 
        expenses: [newExpense, ...state.expenses],
        isAddingExpense: false 
      }));
      
      toast.success("Expense added successfully!");
      return { success: true, data: res.data };
    } catch (error) {
      set({ isAddingExpense: false });
      const errorMessage = error.response?.data?.message || "Failed to add expense";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // Get expense by ID
  getExpenseById: async (expenseId) => {
    try {
      const res = await axiosInstance.get(`/expense/${expenseId}`);
      return { success: true, data: res.data.expense };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch expense";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // Update expense
  updateExpense: async (expenseId, updateData) => {
    set({ isUpdatingExpense: true });
    try {
      const res = await axiosInstance.put(`/expense/update-expense/${expenseId}`, updateData);
      
      // Update the expense in the state
      set(state => ({
        expenses: state.expenses.map(expense => 
          expense.id === expenseId ? res.data.expense : expense
        ),
        isUpdatingExpense: false
      }));
      
      toast.success("Expense updated successfully!");
      return { success: true, data: res.data };
    } catch (error) {
      set({ isUpdatingExpense: false });
      const errorMessage = error.response?.data?.message || "Failed to update expense";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // Delete expense
  deleteExpense: async (expenseId) => {
    set({ isDeletingExpense: true });
    try {
      await axiosInstance.delete(`/expense/delete-expense/${expenseId}`);
      
      // Remove the expense from state
      set(state => ({
        expenses: state.expenses.filter(expense => expense.id !== expenseId),
        isDeletingExpense: false
      }));
      
      toast.success("Expense deleted successfully!");
      return { success: true };
    } catch (error) {
      set({ isDeletingExpense: false });
      const errorMessage = error.response?.data?.message || "Failed to delete expense";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // Get expenses grouped by category
  getExpensesByCategory: () => {
    const { expenses } = get();
    return expenses.reduce((acc, expense) => {
      const category = expense.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(expense);
      return acc;
    }, {});
  },

  // Get total expenses
  getTotalExpenses: () => {
    const { expenses } = get();
    return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  },

  // Get expenses by date range
  getExpensesByDateRange: (startDate, endDate) => {
    const { expenses } = get();
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= new Date(startDate) && expenseDate <= new Date(endDate);
    });
  },

  // Clear expenses (useful for logout)
  clearExpenses: () => {
    set({ 
      expenses: [], 
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalExpenses: 0,
        hasNextPage: false,
        hasPrevPage: false,
      }
    });
  },
}));
