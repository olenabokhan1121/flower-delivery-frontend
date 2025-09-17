import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import { useState } from 'react';
export const Layout = () => {
  const location = useLocation();

  const isFlowersPage =
    location.pathname === '/' || location.pathname.startsWith('/flowers');
  const [sortBy, setSortBy] = useState('price');

  const handleSortChange = type => {
    //  далі  пропси до FlowerShopsPage
    setSortBy(type);
  };
  return (
    <>
      <Header
        showFilter={isFlowersPage}
        onSortChange={handleSortChange}
        currentSort={sortBy}
      />
      <main style={{ paddingTop: '44px' }}>
        <Outlet />
      </main>
    </>
  );
};
