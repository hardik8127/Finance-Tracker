import React from "react";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route
          path="/"
          element={<div className="text-7xl p-8">Landing Page</div>}
        />
        <Route
          path="/login"
          element={<div className="text-7xl p-8">Login Page</div>}
        />
        <Route
          path="/register"
          element={<div className="text-7xl p-8">Register Page</div>}
        />
        <Route
          path="/home"
          element={<div className="text-7xl p-8">Homepage</div>}
        />
        <Route
          path="/dashboard"
          element={<div className="text-7xl p-8">Dashboard</div>}
        />

        <Route
          path="*"
          element={<div className="text-7xl p-8">404 - Page Not Found</div>}
        />
      </Routes>
    </div>
  );
};

export default App;
