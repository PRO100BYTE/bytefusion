/* eslint-disable no-nested-ternary */
import { useDidMount } from '@/hooks';
import PropType from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { applyFilter, resetFilter } from '@/redux/actions/filterActions';
import { selectMax, selectMin } from '@/selectors/selector';
import PriceRange from './PriceRange';

const Filters = ({ closeModal }) => {
  const { filter, isLoading, products } = useSelector((state) => ({
    filter: state.filter,
    isLoading: state.app.loading,
    products: state.products.items
  }));
  const [field, setFilter] = useState({
    brand: filter.brand,
    minPrice: filter.minPrice,
    maxPrice: filter.maxPrice,
    sortBy: filter.sortBy
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const didMount = useDidMount();

  const max = selectMax(products);
  const min = selectMin(products);

  useEffect(() => {
    if (didMount && window.screen.width <= 480) {
      history.push('/');
    }

    if (didMount && closeModal) closeModal();

    setFilter(filter);
    window.scrollTo(0, 0);
  }, [filter]);


  const onPriceChange = (minVal, maxVal) => {
    setFilter({ ...field, minPrice: minVal, maxPrice: maxVal });
  };

  const onBrandFilterChange = (e) => {
    const val = e.target.value;

    setFilter({ ...field, brand: val });
  };

  const onSortFilterChange = (e) => {
    setFilter({ ...field, sortBy: e.target.value });
  };

  const onApplyFilter = () => {
    const isChanged = Object.keys(field).some((key) => field[key] !== filter[key]);

    if (field.minPrice > field.maxPrice) {
      return;
    }

    if (isChanged) {
      dispatch(applyFilter(field));
    } else {
      closeModal();
    }
  };

  const onResetFilter = () => {
    const filterFields = ['brand', 'minPrice', 'maxPrice', 'sortBy'];

    if (filterFields.some((key) => !!filter[key])) {
      dispatch(resetFilter());
    } else {
      closeModal();
    }
  };

  return (
    <div className="filters">
      <div className="filters-field">
        <span>Бренд</span>
        <br />
        <br />
        {products.length === 0 && isLoading ? (
          <h5 className="text-subtle">Загрузка фильтров</h5>
        ) : (
          <select
            className="filters-brand"
            value={field.brand}
            disabled={isLoading || products.length === 0}
            onChange={onBrandFilterChange}
          >
            <option value="">Все бренды</option>
            <option value="salt">Salt Maalat</option>
            <option value="betsin">Betsin Maalat</option>
            <option value="black">Black Kibal</option>
            <option value="sexbomb">Sexbomb</option>
          </select>
        )}
      </div>
      <div className="filters-field">
        <span>Сортировка</span>
        <br />
        <br />
        <select
          className="filters-sort-by d-block"
          value={field.sortBy}
          disabled={isLoading || products.length === 0}
          onChange={onSortFilterChange}
        >
          <option value="">отсутствует</option>
          <option value="name-asc">От А до Я</option>
          <option value="name-desc">От Я до А</option>
          <option value="price-desc">Сначала дорогие</option>
          <option value="price-asc">Сначала дешёвые</option>
        </select>
      </div>
      <div className="filters-field">
        <span>Ценовой диапазон</span>
        <br />
        <br />
        {(products.length === 0 && isLoading) || max === 0 ? (
          <h5 className="text-subtle">Загрузка фильтров</h5>
        ) : products.length === 1 ? (
          <h5 className="text-subtle">Нет ценовых диапазонов</h5>
        ) : (
          <PriceRange
            min={min}
            max={max}
            initMin={field.minPrice}
            initMax={field.maxPrice}
            isLoading={isLoading}
            onPriceChange={onPriceChange}
            productsCount={products.length}
          />
        )}
      </div>
      <div className="filters-action">
        <button
          className="filters-button button button-small"
          disabled={isLoading || products.length === 0}
          onClick={onApplyFilter}
          type="button"
        >
          Применить
        </button>
        <button
          className="filters-button button button-border button-small"
          disabled={isLoading || products.length === 0}
          onClick={onResetFilter}
          type="button"
        >
          Сбросить
        </button>
      </div>
    </div>
  );
};

Filters.propTypes = {
  closeModal: PropType.func.isRequired
};

export default withRouter(Filters);
