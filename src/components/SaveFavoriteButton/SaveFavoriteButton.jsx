import styles from './SaveFavoriteButton.module.css';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { toggleFavoriteFlowerAsync } from '../../redux/flowers/operations';

function SaveFavoriteButton({ id, isFavorite }) {
  const dispatch = useDispatch();

  const handleToggle = async () => {
    try {
      await dispatch(toggleFavoriteFlowerAsync({ id, isFavorite })).unwrap();
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
        <use href="/sprites/symbol-defs.svg#icon-heart" />
      </svg>
    </button>
  );
}

export default SaveFavoriteButton;
