import { createSlice } from '@reduxjs/toolkit';
import { getCart, saveCart } from '../../utils.js';
const initialState = {
  items: getCart('cart'),
  loading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existing = state.items.find(i => i._id === item._id);

      if (existing) {
        existing.count += 1;
      } else {
        state.items.push({ ...item, count: 1 });
      }

      saveCart(state.items);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i._id !== action.payload);

      saveCart(state.items);
    },

    updateQuantity: (state, action) => {
      const { id, count } = action.payload;

      const item = state.items.find(i => i._id === id);
      if (item) item.count = count;

      saveCart(state.items);
    },

    clearCart: state => {
      state.items = [];
      localStorage.removeItem('cart');
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
