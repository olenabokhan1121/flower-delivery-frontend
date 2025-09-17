import { Link } from 'react-router-dom';
import Filter from '../Filter/Filter'; // твій компонент фільтра

const Header = ({ showFilter }) => {
  return (
    <header className="header">
      <nav className="nav-left">
        <Link to="/flowers">Квіти</Link>
        <Link to="/cart">Корзина</Link>
      </nav>

      <div className="nav-right">{showFilter && <Filter />}</div>
    </header>
  );
};

export default Header;
