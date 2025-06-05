import React, { useState, useEffect } from 'react';
import UserProfile from '../components/UserProfile';

const Settings = ({ matrixClient }) => {
  const [notificationSettings, setNotificationSettings] = useState({
    fightCards: true,
    leaderboards: true,
    events: true,
  });
  const [error, setError] = useState('');

  // Save notification settings (mock implementation, persist to Matrix user data in production)
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      // In production, save to Matrix user data or local storage
      console.log('Saving notification settings:', notificationSettings);
    } catch (err) {
      setError('Failed to save settings');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-8">
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Settings</h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Profile</h3>
          <UserProfile matrixClient={matrixClient} userId={matrixClient?.getUserId()} />
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Notification Preferences</h3>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="fightCards"
                checked={notificationSettings.fightCards}
                onChange={(e) =>
                  setNotificationSettings((prev) => ({
                    ...prev,
                    fightCards: e.target.checked,
                  }))
                }
                className="mr-2"
              />
              <label htmlFor="fightCards" className="text-sm">Fight Card Updates</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="leaderboards"
                checked={notification Snack
                onChange={(e) =>
                  setNotificationSettings((prev) => ({
                    ...prev,
                    leaderboards: e.target.checked,
                  }))
                }
                className="mr-2"
              />
              <label htmlFor="leaderboards" className="text-sm">Leaderboard Updates</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="events"
                checked={notificationSettings.events}
                onChange={(e) =>
                  setNotificationSettings((prev) => ({
                    ...prev,
                    events: e.target.checked,
                  }))
                }
                className="mr-2"
              />
              <label htmlFor="events" className="text-sm">Event Announcements</label>
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Save Settings
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;