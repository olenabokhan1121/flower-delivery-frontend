import axios from 'axios';

const api = axios.create({
  baseURL:
    /*'http://localhost:3000/api', */ 'https://flower-delivery-app-gj8q.onrender.com/api',
  withCredentials: true,
});

export const fetchShops = () => api.get('/shops');

export const fetchAllFlowers = params => api.get('/flowers', { params });

export const fetchFlowersByShop = (shopId, params) =>
  api.get(`/flowers/${shopId}`, {
    params,
    headers: { 'Cache-Control': 'no-cache' },
  });

export const addFavoriteFlower = flowerId => api.post(`/favorites/${flowerId}`);

export const removeFavoriteFlower = flowerId =>
  api.delete(`/favorites/${flowerId}`);

export const addOrder = order => api.post('/order', order);

export const getCart = () => {
  return JSON.parse(localStorage.getItem('cart')) || [];
};

export const saveCart = cart => {
  localStorage.setItem('cart', JSON.stringify(cart));
};
