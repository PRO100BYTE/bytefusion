/* eslint-disable react/no-multi-comp */
import { LoadingOutlined } from '@ant-design/icons';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import React, { lazy, Suspense } from 'react';
import UserTab from '../components/UserTab';

const UserAccountTab = lazy(() => import('../components/UserAccountTab'));
const UserWishListTab = lazy(() => import('../components/UserWishListTab'));
const UserOrdersTab = lazy(() => import('../components/UserOrdersTab'));

const Loader = () => (
  <div className="loader" style={{ minHeight: '80vh' }}>
    <LoadingOutlined />
    <h6>Загрузка... </h6>
  </div>
);

const UserAccount = () => {
  useScrollTop();
  useDocumentTitle('ByteFusion | Мой аккаунт');

  return (
    <UserTab>
      <div index={0} label="Профиль">
        <Suspense fallback={<Loader />}>
          <UserAccountTab />
        </Suspense>
      </div>
      <div index={1} label="Избранное">
        <Suspense fallback={<Loader />}>
          <UserWishListTab />
        </Suspense>
      </div>
      <div index={2} label="Мои заказы">
        <Suspense fallback={<Loader />}>
          <UserOrdersTab />
        </Suspense>
      </div>
    </UserTab>
  );
};

export default UserAccount;
