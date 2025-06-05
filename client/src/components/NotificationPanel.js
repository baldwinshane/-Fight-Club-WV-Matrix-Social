import React, { useState, useEffect } from 'react';
import { fetchNotifications } from '../utils/apiIntegration';

const NotificationPanel = ({ roomId }) => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');

  // Fetch notifications from Fight Club WV API
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await fetchNotifications(roomId);
        setNotifications(data);
      } catch (err) {
        setError('Failed to load notifications');
        console.error(err);
      }
    };

    loadNotifications();
    const interval = setInterval(loadNotifications, 60000); // Poll every minute

    return () => clearInterval(interval);
  }, [roomId]);

  return (
    <div className="w-80 bg-gray-800 p-4 border-l border-gray-700 overflow-y-auto">
      <h3 className="text-lg font-bold text-white mb-4">Notifications</h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {notifications.length === 0 ? (
        <p className="text-gray-400">No new notifications</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li key={notification.id} className="p-3 bg-gray-700 rounded">
              <p className="text-sm text-white">{notification.message}</p>
              <p className="text-xs text-gray-400">
                {new Date(notification.timestamp).toLocaleString()}
              </p>
              {notification.type === 'fight_card' && (
                <p className="text-sm text-red-400">
                  {notification.details.matchup} - {notification.details.date}
                </p>
              )}
              {notification.type === 'leaderboard' && (
                <p className="text-sm text-red-400">
                  {notification.details.fighter} ranked #{notification.details.rank}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationPanel;