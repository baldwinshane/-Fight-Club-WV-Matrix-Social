import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Channels from './pages/Channels';
import Settings from './pages/Settings';
import { initializeMatrixClient } from './utils/matrixClient';
import '../styles/main.css';
import '../styles/custom.css';

const App = () => {
  const [matrixClient, setMatrixClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Matrix client on app load
  useEffect(() => {
    const initClient = async () => {
      try {
        // Check if user is already logged in (e.g., via stored credentials or session)
        const storedUserId = localStorage.getItem('matrix_user_id');
        const storedAccessToken = localStorage.getItem('matrix_access_token');

        if (storedUserId && storedAccessToken) {
          const client = initializeMatrixClient(storedUserId, storedAccessToken);
          setMatrixClient(client);
        }
      } catch (error) {
        console.error('Failed to initialize Matrix client on app load:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initClient();

    // Cleanup on unmount
    return () => {
      if (matrixClient) {
        matrixClient.stopClient();
      }
    };
  }, []);

  // Handle Matrix client updates (e.g., after login)
  const handleSetMatrixClient = (client) => {
    setMatrixClient(client);
    // Store credentials in localStorage for persistence (in production, use more secure storage)
    if (client) {
      localStorage.setItem('matrix_user_id', client.getUserId());
      localStorage.setItem('matrix_access_token', client.credentials.accessToken);
    } else {
      localStorage.removeItem('matrix_user_id');
      localStorage.removeItem('matrix_access_token');
    }
  };

  // Protected route component to restrict access to authenticated users
  const ProtectedRoute = ({ children }) => {
    if (isLoading) {
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <p className="text-white text-xl">Loading...</p>
        </div>
      );
    }
    return matrixClient ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="fc-container">
        <Routes>
          <Route path="/" element={<Home matrixClient={matrixClient} />} />
          <Route
            path="/login"
            element={<Login setMatrixClient={handleSetMatrixClient} />}
          />
          <Route
            path="/channels"
            element={
              <ProtectedRoute>
                <Channels matrixClient={matrixClient} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings matrixClient={matrixClient} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;