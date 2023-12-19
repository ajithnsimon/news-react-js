import axios from 'axios';

const apiUrl = process.env.API_BASE_URL || 'http://localhost';

// Function to get user preferences
export const getUserPreferences = async (token) => {
  try {
    const response = await axios.get(`${apiUrl}/userpreference/preferences`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to save user preferences
export const saveUserPreferences = async (token, preferences) => {
  try {
    const response = await axios.post(
      `${apiUrl}/userpreference/preferences`,
      preferences,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
