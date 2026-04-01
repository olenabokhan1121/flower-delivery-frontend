import { configureStore } from '@reduxjs/toolkit';
import { persistedCartReducer } from './cart/cartPersist';
//import orderReducer from './order/slice';
import { persistStore } from 'redux-persist';

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    // order: orderReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
