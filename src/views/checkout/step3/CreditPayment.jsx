/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-else-return */
import { CustomInput } from '@/components/formik';
import { Field, useFormikContext } from 'formik';
import React, { useEffect, useRef } from 'react';

const CreditPayment = () => {
  const { values, setValues } = useFormikContext();
  const collapseContainerRef = useRef(null);
  const cardInputRef = useRef(null);
  const containerRef = useRef(null);
  const checkboxContainerRef = useRef(null);

  const toggleCollapse = () => {
    const cn = containerRef.current;
    const cb = checkboxContainerRef.current;
    const cl = collapseContainerRef.current;

    if (cb && cn && cl) {
      if (values.type === 'credit') {
        cardInputRef.current.focus();
        cn.style.height = `${cb.offsetHeight + cl.offsetHeight}px`;
      } else {
        cardInputRef.current.blur();
        cn.style.height = `${cb.offsetHeight}px`;
      }
    }
  };

  useEffect(() => {
    toggleCollapse();
  }, [values.type]);

  const onCreditModeChange = (e) => {
    if (e.target.checked) {
      setValues({ ...values, type: 'credit' });
      toggleCollapse();
    }
  };

  const handleOnlyNumberInput = (e) => {
    const { key } = e.nativeEvent;
    if (/\D/.test(key) && key !== 'Backspace') {
      e.preventDefault();
    }
  };

  return (
    <>
      <h3 className="text-center">Оплата</h3>
      <br />
      <span className="d-block padding-s">Способ оплаты</span>
      <div
        ref={containerRef}
        className={`checkout-fieldset-collapse ${values.type === 'credit' ? 'is-selected-payment' : ''}`}
      >
        {/* ---- CHECKBOX TOGGLER ------ */}
        <div className="checkout-field margin-0">
          <div className="checkout-checkbox-field" ref={checkboxContainerRef}>
            <input
              checked={values.type === 'credit'}
              id="modeCredit"
              name="type" // the field name in formik I used is type
              onChange={onCreditModeChange}
              type="radio"
            />
            <label
              className="d-flex w-100"
              htmlFor="modeCredit"
            >
              <div className="d-flex-grow-1 margin-left-s">
                <h4 className="margin-0">Банковская карта</h4>
                <span className="text-subtle d-block margin-top-s">
                  Оплата банковской картой (дебетовой или кредитной)
                </span>
              </div>
              <div className="d-flex">
                <div className="payment-img payment-img-visa" />
                &nbsp;
                <div className="payment-img payment-img-mastercard" />
              </div>
            </label>
          </div>
        </div>
        <div className="checkout-collapse-sub" ref={collapseContainerRef}>
          <span className="d-block padding-s text-center">Возможна оплата картами следующих платежных систем</span>
          <div className="checkout-cards-accepted d-flex-center">
            <div className="payment-img payment-img-visa" title="Visa" />
            <div className="payment-img payment-img-mastercard" title="MasterCard" />
          </div>
          <br />
          <div className="checkout-field margin-0">
            <div className="checkout-fieldset">
              <div className="checkout-field">
                <Field
                  name="name"
                  type="text"
                  label="* Имя на карте"
                  placeholder="Dmitriy Ivanov"
                  component={CustomInput}
                  style={{ textTransform: 'capitalize' }}
                  inputRef={cardInputRef}
                />
              </div>
              <div className="checkout-field">
                <Field
                  name="cardnumber"
                  type="text"
                  maxLength={19}
                  onKeyDown={handleOnlyNumberInput}
                  label="* Номер карты"
                  placeholder="Введите номер карты"
                  component={CustomInput}
                />
              </div>
            </div>
            <div className="checkout-fieldset">
              <div className="checkout-field">
                <Field
                  name="expiry"
                  type="date"
                  label="* Действительна до"
                  placeholder="Введите дату"
                  component={CustomInput}
                />
              </div>
              <div className="checkout-field">
                <Field
                  name="ccv"
                  type="text"
                  maxLength={4}
                  onKeyDown={handleOnlyNumberInput}
                  label="* CVV код"
                  placeholder="***"
                  component={CustomInput}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreditPayment;
