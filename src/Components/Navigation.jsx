import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AuthPage from './pages/AuthPage';
import AdminPage from './pages/AdminPage';
import Registration from './pages/Registration';
import MainPage from './pages/MainPage';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

const Navigation = ({ setAddModal }) => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <MainPage />
            </PublicRoute>
          }
        />
        <Route
          path="/auth"
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />
        <Route
          path="/reg"
          element={
            <PublicRoute>
              <Registration />
            </PublicRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <AdminPage setAddModal={setAddModal} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default Navigation;
