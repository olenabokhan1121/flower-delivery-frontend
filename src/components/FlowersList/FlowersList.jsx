import { forwardRef } from 'react';
import FlowerCard from '../FlowerCard/FlowerCard';
import styles from './FlowersList.module.css';

export const FlowerList = forwardRef(
  ({ flowers, loading, startIndex }, ref) => {
    if (!loading && flowers.length === 0) {
      return <p className={styles.noFlowersText}>No flowers found.</p>;
    }

    return (
      <div className={styles.flowerslist}>
        {flowers.map((flower, index) => {
          const isFirstNew = startIndex !== null && index === startIndex;

          return (
            <FlowerCard
              key={flower._id}
              ref={isFirstNew ? ref : null}
              flower={flower}
            />
          );
        })}
      </div>
    );
  }
);
FlowerList.displayName = 'FlowerList';
