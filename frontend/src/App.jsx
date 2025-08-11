import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./page/LandingPage";
import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";
import HomePage from "./page/HomePage";
import ProfilePage from "./page/ProfilePage";
import DashboardPage from "./page/DashboardPage";
import { Loader } from "lucide-react";

import { useAuthStore } from "./store/useAuthStore";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
    // Add dark class to body
    document.body.classList.add('dark');
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950">
        <Loader className="size-10 animate-spin text-blue-400" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-950">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/home"} />}
        />
        <Route
          path="/register"
          element={!authUser ? <SignupPage /> : <Navigate to={"/home"} />}
        />
        <Route
          path="/home"
          element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/dashboard"
          element={authUser ? <DashboardPage /> : <Navigate to={"/login"} />}
        />
      </Routes>
    </div>
  );
};

export default App;
