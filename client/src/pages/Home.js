import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchNotifications } from '../utils/apiIntegration';

const Home = ({ matrixClient }) => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');

  // Fetch recent notifications from Fight Club WV API
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await fetchNotifications(null, 5); // Fetch 5 recent notifications
        setNotifications(data);
      } catch (err) {
        setError('Failed to load notifications');
        console.error(err);
      }
    };

    loadNotifications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-red-600 mb-6 text-center">
          Fight Club WV Matrix Social
        </h1>
        <p className="text-lg mb-8 text-center">
          Welcome to the secure, anonymous communication platform for the Fight Club WV community. Join channels, coordinate sparring, and stay updated on fights. Remember: *Do not talk about Fight Club*.
        </p>
        <div className="flex justify-center space-x-4 mb-8">
          <Link
            to="/login"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded"
          >
            Login
          </Link>
          <Link
            to="/channels"
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded"
          >
            View Channels
          </Link>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Recent Updates</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {notifications.length === 0 ? (
            <p className="text-gray-400">No recent updates</p>
          ) : (
            <ul className="space-y-4">
              {notifications.map((notification) => (
                <li key={notification.id} className="p-3 bg-gray-700 rounded">
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;