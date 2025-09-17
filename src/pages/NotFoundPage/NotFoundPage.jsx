import css from '../NotFoundPage/NotFoundPage.module.css';

import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className={css.notFoundContainer}>
      <p className={css.text}>
        Sorry, page not found! Please go to{' '}
        <Link to="/flowers" className={css.link}>
          Home Page!
        </Link>
      </p>
    </div>
  );
}
