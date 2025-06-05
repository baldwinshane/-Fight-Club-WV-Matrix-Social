import React, { useState, useEffect } from 'react';
import { MatrixClient } from 'matrix-js-sdk';

const UserProfile = ({ matrixClient, userId }) => {
  const [profile, setProfile] = useState({ displayName: '', avatarUrl: '' });
  const [newDisplayName, setNewDisplayName] = useState('');
  const [newAvatar, setNewAvatar] = useState(null);
  const [error, setError] = useState('');

  // Fetch user profile
  useEffect(() => {
    if (!matrixClient || !userId) return;

    const fetchProfile = async () => {
      try {
        const profileData = await matrixClient.getProfileInfo(userId);
        setProfile({
          displayName: profileData.displayname || userId,
          avatarUrl: profileData.avatar_url || '',
        });
        setNewDisplayName(profileData.displayname || '');
      } catch (err) {
        setError('Failed to load profile');
        console.error(err);
      }
    };

    fetchProfile();
  }, [matrixClient, userId]);

  // Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (newDisplayName && newDisplayName !== profile.displayName) {
        await matrixClient.setDisplayName(newDisplayName);
        setProfile(prev => ({ ...prev, displayName: newDisplayName }));
      }
      if (newAvatar) {
        const response = await matrixClient.uploadContent(newAvatar);
        const avatarUrl = response.content_uri;
        await matrixClient.setAvatarUrl(avatarUrl);
        setProfile(prev => ({ ...prev, avatarUrl }));
      }
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <p className="text-lg"><strong>Alias:</strong> {profile.displayName}</p>
        {profile.avatarUrl && (
          <img
            src={matrixClient.mxcUrlToHttp(profile.avatarUrl)}
            alt="Avatar"
            className="w-24 h-24 rounded-full mt-2"
          />
        )}
      </div>
      <form onSubmit={handleUpdateProfile} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Update Alias</label>
          <input
            type="text"
            value={newDisplayName}
            onChange={(e) => setNewDisplayName(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded text-white"
            placeholder="Enter new alias"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Update Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewAvatar(e.target.files[0])}
            className="w-full p-2 bg-gray-700 rounded text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;