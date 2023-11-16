/* eslint-disable jsx-a11y/label-has-associated-control */
import { useFormikContext } from 'formik';
import React from 'react';

const CashPayment = () => {
  const { values, setValues } = useFormikContext();

  return (
    <div className={`checkout-fieldset-collapse ${values.type === 'cash' ? 'is-selected-payment' : ''}`}>
      <div className="checkout-field margin-0">
        <div className="checkout-checkbox-field">
          <input
            checked={values.type === 'cash'}
            id="modeCash"
            name="type"
            onChange={(e) => {
              if (e.target.checked) {
                setValues({ ...values, type: 'cash' });
              }
            }}
            type="radio"
          />
          <label
            className="d-flex w-100"
            htmlFor="modeCash"
          >
            <div className="d-flex-grow-1 margin-left-s">
              <h4 className="margin-0">Оплата наличными</h4>
              <span className="text-subtle d-block margin-top-s">
                Оплата наличными при получении
              </span>
            </div>
            <div className="payment-img payment-img-cash" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default CashPayment;
