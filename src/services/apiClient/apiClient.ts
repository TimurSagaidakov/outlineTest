import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://api.punkapi.com/v2',
  headers: {
    'Content-Type': 'application/json',
  },
});
