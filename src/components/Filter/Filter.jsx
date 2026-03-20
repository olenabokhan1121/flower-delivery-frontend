import css from './Filter.module.css';

const Filter = ({ onSortChange, currentSort }) => {
  return (
    <div className={css.filter}>
      <button
        className={currentSort === 'price' ? css.active : ''}
        onClick={() => onSortChange('price')}
      >
        Sort by price
      </button>
      <button
        className={currentSort === 'createdAt' ? css.active : ''}
        onClick={() => onSortChange('createdAt')}
      >
        Sort by date
      </button>
    </div>
  );
};

export default Filter;
