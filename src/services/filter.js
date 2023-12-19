// services/filters.js

import axios from 'axios';

const apiUrl = process.env.API_BASE_URL || 'http://localhost';

const getConfig = (token) => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export const listAuthors = async (token) => {
  try {
    const response = await axios.post(`${apiUrl}/author/authors`, {}, getConfig(token));
    return response.data.authors;
  } catch (error) {
    throw error;
  }
};

export const listSources = async (token) => {
  try {
    const response = await axios.post(`${apiUrl}/source/sources`, {}, getConfig(token));
    return response.data.sources;
  } catch (error) {
    throw error;
  }
};

export const listCategories = async (token) => {
  try {
    const response = await axios.post(`${apiUrl}/category/categories`, {}, getConfig(token));
    return response.data.categories;
  } catch (error) {
    throw error;
  }
};
