import { useScrollTop } from '@/hooks';
import PropType from 'prop-types';
import React from 'react';

const PageNotFound = ({ history }) => {
  useScrollTop();

  return (
    <div className="page-not-found">
      <h1>Страница не найдена :(</h1>
      <p>Возможно, она была удалена, либо вовсе не существовала на сайте</p>
      <br />
      <button
        className="button"
        onClick={history.goBack}
        type="button"
      >
        Вернуться назад
      </button>
    </div>
  );
};

PageNotFound.propTypes = {
  history: PropType.shape({
    goBack: PropType.func
  }).isRequired
};

export default PageNotFound;
