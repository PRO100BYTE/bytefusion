import { useScrollTop } from '@/hooks';
import React from 'react';

const NoInternet = () => {
  useScrollTop();

  return (
    <div className="page-not-found">
      <h1>Эй, а где интернет? :(</h1>
      <p>Проверь подключение к Интернету и попробуй еще раз</p>
      <br />
      <button
        className="button"
        onClick={() => window.location.reload(true)}
        type="button"
      >
        Попробовать еще раз
      </button>
    </div>

  );
};

export default NoInternet;
