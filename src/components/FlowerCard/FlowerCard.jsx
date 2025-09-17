import styles from './FlowerCard.module.css';
import { useNavigate } from 'react-router-dom';
import { forwardRef } from 'react';
const FlowerCard = forwardRef(({ flower }, ref) => {
  const navigate = useNavigate();

  const { _id, shopId, name, imageUrl } = flower;

  return (
    <div ref={ref} className={styles.card}>
      <img src={imageUrl} alt={name} className={styles.imageCard} />
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
