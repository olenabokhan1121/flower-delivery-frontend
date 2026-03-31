import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import cartReducer from './slice';

const cartPersistConfig = {
  key: 'cart',
  storage,
};

export const persistedCartReducer = persistReducer(
  cartPersistConfig,
  cartReducer
);
