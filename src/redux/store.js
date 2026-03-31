import { configureStore } from '@reduxjs/toolkit';
import { persistedCartReducer } from './cart/cartPersist';
//import orderReducer from './order/slice';
import { persistStore } from 'redux-persist';

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    // order: orderReducer,
  },
});

export const persistor = persistStore(store);
