import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useBudgetStore = create((set, get) => ({
  budgets: [],
  budgetComparison: null,
  isLoading: false,
  isSettingBudget: false,
  isDeletingBudget: false,
  isLoadingComparison: false,

  // Set budget for a category
  setBudget: async (budgetData) => {
    set({ isSettingBudget: true });
    try {
      const res = await axiosInstance.post("/budget/set-budget", budgetData);
      
      // Update or add budget in state
      set(state => {
        const existingBudgetIndex = state.budgets.findIndex(
          budget => budget.category === budgetData.category && 
                   budget.month === budgetData.month && 
                   budget.year === budgetData.year
        );
        
        if (existingBudgetIndex !== -1) {
          // Update existing budget
          const updatedBudgets = [...state.budgets];
          updatedBudgets[existingBudgetIndex] = res.data.budget;
          return { budgets: updatedBudgets, isSettingBudget: false };
        } else {
          // Add new budget
          return { 
            budgets: [...state.budgets, res.data.budget], 
            isSettingBudget: false 
          };
        }
      });
      
      toast.success("Budget set successfully!");
      return { success: true, data: res.data };
    } catch (error) {
      set({ isSettingBudget: false });
      const errorMessage = error.response?.data?.message || "Failed to set budget";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // Get all budgets for a specific month/year
  getAllBudgets: async (month, year) => {
    set({ isLoading: true });
    try {
      const params = new URLSearchParams();
      if (month) params.append('month', month);
      if (year) params.append('year', year);

      const res = await axiosInstance.get(`/budget/get-all-budgets?${params}`);
      
      set({ 
        budgets: res.data.budgets,
        isLoading: false 
      });
      return { success: true, data: res.data };
    } catch (error) {
      set({ isLoading: false });
      const errorMessage = error.response?.data?.message || "Failed to fetch budgets";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // Get budget by ID
  getBudgetById: async (budgetId) => {
    try {
      const res = await axiosInstance.get(`/budget/${budgetId}`);
      return { success: true, data: res.data.budget };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch budget";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // Get budget by category
  getBudgetByCategory: async (category, month, year) => {
    try {
      const params = new URLSearchParams();
      if (month) params.append('month', month);
      if (year) params.append('year', year);

      const res = await axiosInstance.get(`/budget/category/${category}?${params}`);
      return { success: true, data: res.data.budget };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Budget not found for this category";
      return { success: false, error: errorMessage };
    }
  },

  // Delete budget
  deleteBudget: async (budgetId) => {
    set({ isDeletingBudget: true });
    try {
      await axiosInstance.delete(`/budget/delete/${budgetId}`);
      
      // Remove budget from state
      set(state => ({
        budgets: state.budgets.filter(budget => budget.id !== budgetId),
        isDeletingBudget: false
      }));
      
      toast.success("Budget deleted successfully!");
      return { success: true };
    } catch (error) {
      set({ isDeletingBudget: false });
      const errorMessage = error.response?.data?.message || "Failed to delete budget";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // Get budget comparison (budget vs actual spending)
  getBudgetComparison: async (month, year) => {
    set({ isLoadingComparison: true });
    try {
      const params = new URLSearchParams();
      if (month) params.append('month', month);
      if (year) params.append('year', year);

      const res = await axiosInstance.get(`/budget/comparison?${params}`);
      
      set({ 
        budgetComparison: res.data.data,
        isLoadingComparison: false 
      });
      return { success: true, data: res.data.data };
    } catch (error) {
      set({ isLoadingComparison: false });
      const errorMessage = error.response?.data?.message || "Failed to fetch budget comparison";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // Get budget summary
  getBudgetSummary: () => {
    const { budgetComparison } = get();
    if (!budgetComparison) return null;
    
    return budgetComparison.summary;
  },

  // Get over-budget categories
  getOverBudgetCategories: () => {
    const { budgetComparison } = get();
    if (!budgetComparison) return [];
    
    return budgetComparison.categories.filter(category => category.isOverBudget);
  },

  // Get budget utilization percentage
  getBudgetUtilization: () => {
    const { budgetComparison } = get();
    if (!budgetComparison) return 0;
    
    return budgetComparison.summary.overallPercentageUsed;
  },

  // Clear budgets (useful for logout)
  clearBudgets: () => {
    set({ 
      budgets: [], 
      budgetComparison: null 
    });
  },

  // Helper function to get current month budgets
  getCurrentMonthBudgets: () => {
    const { budgets } = get();
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    
    return budgets.filter(budget => 
      budget.month === currentMonth && budget.year === currentYear
    );
  },

  // Calculate total budget for current month
  getTotalBudget: () => {
    const currentBudgets = get().getCurrentMonthBudgets();
    return currentBudgets.reduce((total, budget) => total + parseFloat(budget.amount), 0);
  },
}));
