import { Link } from 'react-router-dom';
import Filter from '../Filter/Filter';
import css from './Header.module.css';
const Header = ({ showFilter, onSortChange, currentSort }) => {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <nav className={css.nav}>
          <Link className={css.link} to="/flowers">
            Shop
          </Link>
          <span className={css.divider}></span>
          <Link className={css.link} to="/cart">
            Shopping Cart
          </Link>
        </nav>
        <div className={css.sort}>
          {showFilter && (
            <Filter onSortChange={onSortChange} currentSort={currentSort} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
