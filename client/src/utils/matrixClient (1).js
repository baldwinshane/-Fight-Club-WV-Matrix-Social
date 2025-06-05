import { createClient } from 'matrix-js-sdk';

// Matrix client configuration
const MATRIX_SERVER_URL = process.env.REACT_APP_MATRIX_SERVER_URL || 'https://matrix.fightclub.org';
const MATRIX_ACCESS_TOKEN = process.env.REACT_APP_MATRIX_ACCESS_TOKEN || null;

// Initialize Matrix client
export const initializeMatrixClient = (userId, accessToken = MATRIX_ACCESS_TOKEN) => {
  try {
    const client = createClient({
      baseUrl: MATRIX_SERVER_URL,
      userId,
      accessToken,
      deviceId: `fight-club-wv-${Date.now()}`, // Unique device ID
    });

    // Start client to sync with Matrix server
    client.startClient({
      initialSyncLimit: 50, // Limit initial message sync for performance
    });

    // Handle client errors
    client.on('sync', (state, prevState, data) => {
      if (state === 'ERROR') {
        console.error('Matrix sync error:', data.error);
      } else if (state === 'PREPARED') {
        console.log('Matrix client ready');
      }
    });

    return client;
  } catch (error) {
    console.error('Failed to initialize Matrix client:', error);
    throw new Error('Matrix client initialization failed');
  }
};

// Join a Matrix room by alias or ID
export const joinRoom = async (client, roomAliasOrId) => {
  try {
    const room = await client.joinRoom(roomAliasOrId);
    return room;
  } catch (error) {
    console.error(`Failed to join room ${roomAliasOrId}:`, error);
    throw new Error('Failed to join room');
  }
};

// Send a message to a room
export const sendMessage = async (client, roomId, content) => {
  try {
    await client.sendMessage(roomId, {
      msgtype: 'm.text',
      body: content,
    });
  } catch (error) {
    console.error(`Failed to send message to room ${roomId}:`, error);
    throw new Error('Failed to send message');
  }
};

// Get user profile information
export const getUserProfile = async (client, userId) => {
  try {
    const profile = await client.getProfileInfo(userId);
    return {
      displayName: profile.displayname || userId,
      avatarUrl: profile.avatar_url || '',
    };
  } catch (error) {
    console.error(`Failed to fetch profile for ${userId}:`, error);
    throw new Error('Failed to fetch user profile');
  }
};

// Update user display name
export const updateDisplayName = async (client, displayName) => {
  try {
    await client.setDisplayName(displayName);
  } catch (error) {
    console.error('Failed to update display name:', error);
    throw new Error('Failed to update display name');
  }
};

// Update user avatar
export const updateAvatar = async (client, file) => {
  try {
    const response = await client.uploadContent(file);
    const avatarUrl = response.content_uri;
    await client.setAvatarUrl(avatarUrl);
    return avatarUrl;
  } catch (error) {
    console.error('Failed to update avatar:', error);
    throw new Error('Failed to update avatar');
  }
};

// Listen for room events
export const listenForEvents = (client, eventType, callback) => {
  client.on(eventType, callback);
  return () => client.off(eventType, callback);
};