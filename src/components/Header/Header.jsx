import { NavLink } from 'react-router-dom';
import Filter from '../Filter/Filter';
import css from './Header.module.css';
const Header = ({ showFilter, onSortChange, currentSort }) => {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <nav className={css.nav}>
          <NavLink
            to="/flowers"
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.active}` : css.link
            }
          >
            Shop
          </NavLink>
          <span className={css.divider}></span>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.active}` : css.link
            }
            to="/cart"
          >
            Shopping Cart
          </NavLink>
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
