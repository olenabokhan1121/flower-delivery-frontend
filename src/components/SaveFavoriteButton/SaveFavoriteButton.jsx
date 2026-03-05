import styles from './SaveFavoriteButton.module.css';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addFavoriteFlower, removeFavoriteFlower } from '../../utils';

function SaveFavoriteButton({ id, isFavorite, onToggle }) {
  const handleToggle = async () => {
    try {
      if (isFavorite) {
        await removeFavoriteFlower(id);
      } else {
        await addFavoriteFlower(id);
      }

      onToggle(id); // оновлюємо локальний state
    } catch (error) {
      toast.error('Failed to update favorites 😢');
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`${styles.heart} ${isFavorite ? styles.active : ''}`}
      aria-label={isFavorite ? 'Remove' : 'Add to favorites'}
    >
      <svg className={styles.icon} width="16" height="16">
        <use href="public/sprites/icons/symbol-defs.svg#icon-heart" />
      </svg>
    </button>
  );
}

export default SaveFavoriteButton;
