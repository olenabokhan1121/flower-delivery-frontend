import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('cart')) || [],
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

      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i._id !== action.payload);

      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    updateQuantity: (state, action) => {
      const { id, count } = action.payload;

      const item = state.items.find(i => i._id === id);
      if (item) item.count = count;

      localStorage.setItem('cart', JSON.stringify(state.items));
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
