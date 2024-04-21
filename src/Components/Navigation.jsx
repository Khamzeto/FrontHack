import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AuthPage from './pages/AuthPage';
import AdminPage from './pages/AdminPage';
import Registration from './pages/Registration';
import MainPage from './pages/MainPage';
import Students from './pages/Students';
import Profile from './pages/Profile';
import University from './pages/University';
import UniversitySolo from './pages/UniversitySolo';

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
    return <Navigate to="/" replace />;
  }

  return children;
};

const Navigation = ({ setAddModal }) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
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
        {/*
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <AdminPage setAddModal={setAddModal} />
            </ProtectedRoute>
          }
        />
        */}
        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <Students />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/universities"
          element={
            <ProtectedRoute>
              <University />
            </ProtectedRoute>
          }
        />
        <Route
          path="/university/:id"
          element={
            <ProtectedRoute>
              <UniversitySolo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default Navigation;
