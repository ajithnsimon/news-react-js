import axios from 'axios';

const apiUrl = process.env.API_BASE_URL || 'http://localhost';

export const signin = async (email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, {
      email,
      password,
    });

    if (response.status === 200) {
      const result = response.data;
      localStorage.setItem('jwtToken', result.token);
      return result;
    } else {
      throw new Error('Authentication failed');
    }
  } catch (error) {
    console.error('An error occurred during authentication', error);
    throw error;
  }
};

export const signup = async (name, email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/user/register`, {
      name,
      email,
      password,
    });

    if (response.status === 200) {
      const result = response.data;
      return result;
    } else {
      throw new Error('Signup failed');
    }
  } catch (error) {
    throw error;
  }
};

export const signout = async (token) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/logout`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      localStorage.removeItem('jwtToken');
      const result = response.data;
      return result;
    } else {
      throw new Error('Logout failed');
    }
  } catch (error) {
    console.error('An error occurred during logout', error);
    throw error;
  }
};

