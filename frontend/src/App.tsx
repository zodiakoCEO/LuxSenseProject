import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import DashboardPage from "./components/pages/DashboardPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import AuthCallbackPage from './components/pages/AuthCallbackPage';
import AmbientesPage from './components/pages/AmbientesPage';
import DemoDashboardPage from './components/pages/DemoDashboardPage';
import { useAuth } from "./context/AuthContext";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/Login" />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route path="/Dashboard" element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        } />
        <Route path="/ambientes" element={
          <PrivateRoute>
            <AmbientesPage />
          </PrivateRoute>
        } />
        <Route path="/demo" element={<DemoDashboardPage />} />
      </Routes>
    </Router>
  );
};

export default App;