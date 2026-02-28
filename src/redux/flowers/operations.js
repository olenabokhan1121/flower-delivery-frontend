import { createAsyncThunk } from '@reduxjs/toolkit';
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
);
/* в картці <SaveFavoriteButton
  id={flower._id}
  isFavorite={flower.isFavorite}
/>
cлайс редьюсер builder
  .addCase(toggleFavoriteFlowerAsync.pending, (state, action) => {
    const { id } = action.meta.arg;

    const flower = state.flowers.find(f => f._id === id);

    if (flower) {
      flower.isFavorite = !flower.isFavorite;
    }
  })

  .addCase(toggleFavoriteFlowerAsync.rejected, (state, action) => {
    const { id } = action.meta.arg;

    const flower = state.flowers.find(f => f._id === id);

    if (flower) {
      flower.isFavorite = !flower.isFavorite; // rollback
    }
  });*/
