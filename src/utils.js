import axios from 'axios';

const api = axios.create({
  baseURL: 'https://flower-delivery-app-gj8q.onrender.com/api',
  withCredentials: true,
});

export const fetchShops = () => api.get('/shops');

export const fetchAllFlowers = params => api.get('/flowers', { params });

export const fetchFlowersByShop = (shopId, params) =>
  api.get(`/flowers/${shopId}`, { params });

export const addFavoriteFlower = flowerId => api.post(`/favorites/${flowerId}`);

export const removeFavoriteFlower = flowerId =>
  api.delete(`/favorites/${flowerId}`);
