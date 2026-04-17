import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import JobFeed from './pages/JobFeed';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};


function App() {
  return (
    <Router>

      <div className="bg-[#0f172a] min-h-screen w-full m-0 p-0 overflow-x-hidden">
        <Navbar />

        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<JobFeed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;