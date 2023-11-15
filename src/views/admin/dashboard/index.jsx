import { useDocumentTitle, useScrollTop } from '@/hooks';
import React from 'react';

const Dashboard = () => {
  useDocumentTitle('ByteFusion Admin');
  useScrollTop();

  return (
    <div className="loader">
      <h2>Добро пожаловать в панель администратора</h2>
    </div>
  );
};

export default Dashboard;
