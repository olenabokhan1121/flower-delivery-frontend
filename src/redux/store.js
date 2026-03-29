import { configureStore } from '@reduxjs/toolkit';

//import storage from 'redux-persist/lib/storage';
import cartReducer from './cart/slice';

//export const persistor = persistStore(store);

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
  },
});
