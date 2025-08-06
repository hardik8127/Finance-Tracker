import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  isLoggingOut: false,


  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const res = await axiosInstance.get("/auth/check"); 
      set({ authUser: res.data.user, isCheckingAuth: false });
    } catch (error) {
      console.log("Not authenticated");
      set({ authUser: null, isCheckingAuth: false });
    }
  },

  registerUser: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      toast.success("Registration successful! Please check your email to verify your account.");
      set({ isSigningUp: false });
      return { success: true, data: res.data };
    } catch (error) {
      set({ isSigningUp: false });
      const errorMessage = error.response?.data?.message || "Registration failed";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  loginUser: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ 
        authUser: res.data.User, 
        isLoggingIn: false 
      });
      toast.success("Login successful!");
      return { success: true, data: res.data };
    } catch (error) {
      set({ isLoggingIn: false });
      const errorMessage = error.response?.data?.message || "Login failed";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  verifyUser: async (token) => {
    try {
      const res = await axiosInstance.get(`/auth/verify/${token}`);
      toast.success("Email verified successfully! You can now login.");
      return { success: true, data: res.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Email verification failed";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  logoutUser: async () => {
    set({ isLoggingOut: true });
    try {
      await axiosInstance.post("/auth/logout");
      set({ 
        authUser: null, 
        isLoggingOut: false 
      });
      toast.success("Logged out successfully!");
      return { success: true };
    } catch (error) {
      set({ isLoggingOut: false });
      const errorMessage = error.response?.data?.message || "Logout failed";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  forgotPassword: async (email) => {
    try {
      const res = await axiosInstance.post("/auth/forgot-password", { email });
      toast.success("Password reset email sent! Check your inbox.");
      return { success: true, data: res.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to send reset email";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  resetPassword: async (token, password) => {
    try {
      const res = await axiosInstance.post(`/auth/reset/${token}`, { password });
      toast.success("Password reset successful! You can now login with your new password.");
      return { success: true, data: res.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Password reset failed";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },
}));
