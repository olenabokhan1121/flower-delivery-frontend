import css from './App.module.css';

import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Layout } from '../Layout/Layout';

import Loading from '../Loading/Loading';
import NotificationToast from '../NotificationToast/NotificationToast';

import { FlowerShopsPage } from '../../pages/FlowerShopsPage/FlowerShopsPage.jsx';
const OrderDetailsPage = lazy(() =>
  import('../../pages/OrderDetailsPage/OrderDetailsPage.jsx')
);
const ShoppingCartPage = lazy(() =>
  import('../../pages/ShoppingCartPage/ShoppingCartPage.jsx')
);
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage')
);

export default function App() {
  return (
    <div className={css.app}>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<FlowerShopsPage />} />
            <Route path="flowers" element={<FlowerShopsPage />} />

            <Route path="cart" element={<ShoppingCartPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="order" element={<OrderDetailsPage />} />
        </Routes>
      </Suspense>

      <NotificationToast />
    </div>
  );
}
