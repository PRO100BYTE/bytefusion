/* eslint-disable max-len */
import { BasketItem, BasketToggle } from '@/components/basket';
import { Boundary, Modal } from '@/components/common';
import { CHECKOUT_STEP_1 } from '@/constants/routes';
import firebase from 'firebase/firebase';
import { calculateTotal, displayMoney } from '@/helpers/utils';
import { useDidMount, useModal } from '@/hooks';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { clearBasket } from '@/redux/actions/basketActions';

const Basket = () => {
  const { isOpenModal, onOpenModal, onCloseModal } = useModal();
  const { basket, user } = useSelector((state) => ({
    basket: state.basket,
    user: state.auth
  }));
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const didMount = useDidMount();

  useEffect(() => {
    if (didMount && firebase.auth.currentUser && basket.length !== 0) {
      firebase.saveBasketItems(basket, firebase.auth.currentUser.uid)
        .then(() => {
          console.log('Товар добавлен в корзину');
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [basket.length]);

  const onCheckOut = () => {
    if ((basket.length !== 0 && user)) {
      document.body.classList.remove('is-basket-open');
      history.push(CHECKOUT_STEP_1);
    } else {
      onOpenModal();
    }
  };

  const onSignInClick = () => {
    onCloseModal();
    document.body.classList.remove('basket-open');
    history.push(CHECKOUT_STEP_1);
  };

  const onClearBasket = () => {
    if (basket.length !== 0) {
      dispatch(clearBasket());
    }
  };

  return user && user.role === 'ADMIN' ? null : (
    <Boundary>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={onCloseModal}
      >
        <p className="text-center">Для оформления заказа вы должны быть авторизованы</p>
        <br />
        <div className="d-flex-center">
          <button
            className="button button-border button-border-gray button-small"
            onClick={onCloseModal}
            type="button"
          >
            Продолжить покупки
          </button>
          &nbsp;
          <button
            className="button button-small"
            onClick={onSignInClick}
            type="button"
          >
            Авторизоваться
          </button>
        </div>
      </Modal>
      <div className="basket">
        <div className="basket-list">
          <div className="basket-header">
            <h3 className="basket-header-title">
              Корзина &nbsp;
              <span>
                (
                {` ${basket.length} ${basket.length > 1 ? 'товаров' : 'товар'}`}
                )
              </span>
            </h3>
            <BasketToggle>
              {({ onClickToggle }) => (
                <span
                  className="basket-toggle button button-border button-border-gray button-small"
                  onClick={onClickToggle}
                  role="presentation"
                >
                  Закрыть
                </span>
              )}
            </BasketToggle>
            <button
              className="basket-clear button button-border button-border-gray button-small"
              disabled={basket.length === 0}
              onClick={onClearBasket}
              type="button"
            >
              <span>Очистить корзину</span>
            </button>
          </div>
          {basket.length <= 0 && (
            <div className="basket-empty">
              <h5 className="basket-empty-msg">Ваша корзина пуста. Давайте исправим это!</h5>
            </div>
          )}
          {basket.map((product, i) => (
            <BasketItem
              // eslint-disable-next-line react/no-array-index-key
              key={`${product.id}_${i}`}
              product={product}
              basket={basket}
              dispatch={dispatch}
            />
          ))}
        </div>
        <div className="basket-checkout">
          <div className="basket-total">
            <p className="basket-total-title">Итого:</p>
            <h2 className="basket-total-amount">
              {displayMoney(calculateTotal(basket.map((product) => product.price * product.quantity)))}
            </h2>
          </div>
          <button
            className="basket-checkout-button button"
            disabled={basket.length === 0 || pathname === '/checkout'}
            onClick={onCheckOut}
            type="button"
          >
            Перейти к оформлению
          </button>
        </div>
      </div>
    </Boundary>
  );
};

export default Basket;
