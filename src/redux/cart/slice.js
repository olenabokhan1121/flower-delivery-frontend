import { createSlice } from '@reduxjs/toolkit';
//import { getCart, saveCart } from '../../utils.js';
const initialState = {
  //items: getCart('cart'),    persist працює автоматично
  items: [],
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
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i._id !== action.payload);
    },

    updateQuantity: (state, action) => {
      const { id, count } = action.payload;

      const item = state.items.find(i => i._id === id);
      if (item) item.count = count;
    },

    clearCart: state => {
      state.items = [];
      //localStorage.removeItem('cart');
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

/* handlesubmit перевірити з обєктом на беці логіку і що отримує бекенд але це вже мабуть orderslice*/

/*зробити кнопку сабміт disabled поки всі поля не заповнені і хоч одна квітка*/
