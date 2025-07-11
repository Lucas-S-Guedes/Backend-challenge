import React from "react";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Dashboard /> : <Login />;
};

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
