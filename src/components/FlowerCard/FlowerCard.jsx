import styles from './FlowerCard.module.css';
import { useNavigate } from 'react-router-dom';
import { forwardRef } from 'react';
const FlowerCard = forwardRef(({ flower }, ref) => {
  const navigate = useNavigate();

  const { _id, shopId, name, imageUrl } = flower;

  return (
    <div ref={ref} className={styles.card}>
      <img src={imageUrl} alt={name} className={styles.imageCard} />
      <button
        onClick={handleToggle}
        className={styles.heart}
        aria-label={isFavorite ? 'Remove' : 'Add to favorites'}
      >
        <svg className={styles.icon} width="16" height="16">
          <use
            href={
              isFavorite
                ? `/sprites/symbol-defs.svg#icon-Property-1Active`
                : `/sprites/symbol-defs.svg#icon-Property-1Default`
            }
          />
        </svg>
      </button>
      <div className={styles.form}>
        <h3 className={styles.title}>{name}</h3>{' '}
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
