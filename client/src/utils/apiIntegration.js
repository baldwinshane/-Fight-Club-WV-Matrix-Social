import axios from 'axios';

// Fight Club API configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.fightclub.org';
const API_TOKEN = process.env.REACT_APP_API_TOKEN || null;

// Axios instance for API requests
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: API_TOKEN ? `Bearer ${API_TOKEN}` : undefined,
    'Content-Type': 'application/json',
  },
});

// Fetch notifications from Fight Club API
export const fetchNotifications = async (roomId = null, limit = 10) => {
  try {
    const params = { limit };
    if (roomId) {
      params.roomId = roomId; // Filter notifications for specific room
    }

    const response = await apiClient.get('/notifications', { params });
    return response.data.map((notification) => ({
      id: notification.id,
      message: notification.message,
      timestamp: notification.timestamp,
      type: notification.type, // e.g., 'fight_card', 'leaderboard', 'event'
      details: notification.details || {},
    }));
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
    throw new Error('Failed to fetch notifications');
  }
};

// Fetch fighter profile
export const fetchFighterProfile = async (fighterId) => {
  try {
    const response = await apiClient.get(`/fighters/${fighterId}`);
    return {
      id: response.data.id,
      alias: response.data.alias,
      record: response.data.record,
      weightClass: response.data.weight_class,
      streak: response.data.streak,
    };
  } catch (error) {
    console.error(`Failed to fetch fighter profile ${fighterId}:`, error);
    throw new Error('Failed to fetch fighter profile');
  }
};

// Fetch leaderboard
export const fetchLeaderboard = async () => {
  try {
    const response = await apiClient.get('/leaderboard');
    return response.data.map((entry) => ({
      fighterId: entry.fighter_id,
      alias: entry.alias,
      rank: entry.rank,
      wins: entry.wins,
      streak: entry.streak,
    }));
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error);
    throw new Error('Failed to fetch leaderboard');
  }
};

// Fetch upcoming fight cards
export const fetchFightCards = async () => {
  try {
    const response = await apiClient.get('/fight-cards');
    return response.data.map((card) => ({
      id: card.id,
      matchup: `${card.fighter1} vs ${card.fighter2}`,
      date: card.date,
      weightClass: card.weight_class,
      rules: card.rules, // e.g., 'mma_gloves', 'bare_knuckle'
    }));
  } catch (error) {
    console.error('Failed to fetch fight cards:', error);
    throw new Error('Failed to fetch fight cards');
  }
};

// Report a rule violation (e.g., social media mention)
export const reportRuleViolation = async (userId, details) => {
  try {
    const response = await apiClient.post('/violations', {
      userId,
      details,
      timestamp: new Date().toISOString(),
    });
    return response.data;
  } catch (error) {
    console.error('Failed to report rule violation:', error);
    throw new Error('Failed to report rule violation');
  }
};

// Flag sparring partners to exclude from leaderboard
export const flagSparringPartners = async (fighterId1, fighterId2) => {
  try {
    const response = await apiClient.post('/sparring', {
      fighterId1,
      fighterId2,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to flag sparring partners:', error);
    throw new Error('Failed to flag sparring partners');
  }
};