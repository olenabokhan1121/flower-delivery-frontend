/*import { createAsyncThunk } from '@reduxjs/toolkit';
import { addFavoriteFlower, removeFavoriteFlower } from '../../utils';

export const toggleFavoriteFlowerAsync = createAsyncThunk(
  'flowers/toggleFavorite',
  async ({ id, isFavorite }, thunkAPI) => {
    try {
      if (isFavorite) {
        await removeFavoriteFlower(id);
      } else {
        await addFavoriteFlower(id);
      }

      return { id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);*/
