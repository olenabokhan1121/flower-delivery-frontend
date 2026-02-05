import { useState } from 'react';
import { createSelector } from '@reduxjs/toolkit';

import styles from './SaveFavoriteButton.module.css';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavoriteRecipeAsync } from '../../redux/recipes/operations';
import {
  selectIsLoggedIn,
  selectFavoriteRecipes,
} from '../../redux/auth/selectors';
import { clearRecipes } from '../../redux/recipes/slice';
import { fetchFavoriteRecipes } from '../../redux/recipes/operations';
import AuthPromptModal from '../AuthPromptModal/AuthPromptModal';

const makeSelectIsFavorite = recipeId =>
  createSelector([selectFavoriteRecipes], favoriteRecipes =>
    favoriteRecipes.includes(recipeId)
  );

function SaveFavoriteButton({ small, recipeId, mode }) {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const isFavorite = useSelector(makeSelectIsFavorite(recipeId));

  const [showModal, setShowModal] = useState(false);

  const handleToggle = async () => {
    try {
      await dispatch(toggleFavoriteFlowerAsync({ _id })).unwrap();
      if (isFavorite) {
        dispatch(clearFlower());
        dispatch(fetchFavoriteFlowers({ page: 1, perPage: 12, append: false }));
      }
    } catch (error) {
      if (!isFavorite) {
        toast.error('Failed to add to favorites 😢');
      } else {
        toast.error('Failed to remove from favorites 😢');
      }
    }
  };

  return (
    <>
      <button
        onClick={handleToggle}
        className={`${styles.heart} ${isFavorite ? styles.active : ''}`}
        aria-label={isFavorite ? 'Remove' : 'Add to favorites'}
      >
        <svg className={styles.icon} width="16" height="16">
          <use href="/sprites/symbol-defs.svg#icon-heart" />
        </svg>
      </button>
    </>
  );
}

export default SaveFavoriteButton;
