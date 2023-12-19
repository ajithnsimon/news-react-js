import axios from 'axios';

const apiUrl = process.env.API_BASE_URL || 'http://localhost';

export const listArticles = async (token, filter) => {
  try {
    const response = await axios.post(`${apiUrl}/article/articles`, filter, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.data; // Assuming the response contains the list of articles
  } catch (error) {
    throw error;
  }
};
