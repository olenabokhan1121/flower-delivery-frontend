import styles from './FlowerCard.module.css';
import { useNavigate } from 'react-router-dom';
import { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import SaveFavoriteButton from '../SaveFavoriteButton/SaveFavoriteButton';
import { addToCart } from '../../redux/cart/slice';
const FlowerCard = forwardRef(({ flower, onToggleFavorite }, ref) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

        <button
          className={styles.Button}
          onClick={() => {
            dispatch(addToCart(flower));
            navigate(`/cart`);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
});
FlowerCard.displayName = 'FlowerCard';
export default FlowerCard;
