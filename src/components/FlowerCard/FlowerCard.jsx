import styles from './FlowerCard.module.css';
import { useNavigate } from 'react-router-dom';
import { forwardRef } from 'react';
import SaveFavoriteButton from '../SaveFavoriteButton/SaveFavoriteButton';
const FlowerCard = forwardRef(({ flower, onToggleFavorite }, ref) => {
  const navigate = useNavigate();

  const { _id, name, imageUrl, isFavorite } = flower;

  return (
    <div ref={ref} className={styles.card}>
      <img src={imageUrl} alt={name} className={styles.imageCard} />
      <SaveFavoriteButton
        id={_id}
        isFavorite={isFavorite}
        onToggle={onToggleFavorite}
      />

      <div className={styles.form}>
        <h3 className={styles.title}>{name}</h3>
        <div>
          <button className={styles.Button} onClick={() => navigate(`/cart`)}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
});
FlowerCard.displayName = 'FlowerCard';
export default FlowerCard;
