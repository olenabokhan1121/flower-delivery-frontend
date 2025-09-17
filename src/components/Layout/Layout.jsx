import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';

export const Layout = () => {
  const location = useLocation();

  const isFlowersPage = location.pathname.startsWith('/flowers');

  return (
    <>
      <Header showFilter={isFlowersPage} />
      <main>
        <Outlet />
      </main>
    </>
  );
};
