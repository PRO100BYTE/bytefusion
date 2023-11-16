import { CHECKOUT_STEP_1 } from '@/constants/routes';
import { Form, Formik } from 'formik';
import { displayActionMessage } from '@/helpers/utils';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import PropType from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { StepTracker } from '../components';
import withCheckout from '../hoc/withCheckout';
import CreditPayment from './CreditPayment';
import CashPayment from './CashPayment';
import Total from './Total';

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, 'Имя должно быть не меньше 4 символов')
    .required('Необходимо указать имя'),
  cardnumber: Yup.string()
    .min(13, 'Card number should be 13-19 digits long')
    .max(19, 'Card number should only be 13-19 digits long')
    .required('Необходимо указать номер карты'),
  expiry: Yup.date()
    .required('Необходимо указать срок действия карты'),
  ccv: Yup.string()
    .min(3, 'CVV код должен состоять из 3-4 цифр')
    .max(4, 'CVV код должен состоять из 3-4 цифр')
    .required('Необходимо указать CVV код'),
  type: Yup.string().required('Пожалуйста, выберите способ оплаты')
});

const Payment = ({ shipping, payment, subtotal }) => {
  useDocumentTitle('ByteFusion | Оформление заказа');
  useScrollTop();

  const initFormikValues = {
    name: payment.name || '',
    cardnumber: payment.cardnumber || '',
    expiry: payment.expiry || '',
    ccv: payment.ccv || '',
    type: payment.type || 'cash'
  };

  const onConfirm = () => {
    displayActionMessage('Извините, данный функционал пока недоступен :(', 'error');
  };

  if (!shipping || !shipping.isDone) {
    return <Redirect to={CHECKOUT_STEP_1} />;
  }
  return (
    <div className="checkout">
      <StepTracker current={3} />
      <Formik
        initialValues={initFormikValues}
        validateOnChange
        validationSchema={FormSchema}
        validate={(form) => {
          if (form.type === 'cash') {
            displayActionMessage('Извините, данный функционал пока недоступен :(', 'error');
          }
        }}
        onSubmit={onConfirm}
      >
        {() => (
          <Form className="checkout-step-3">
            <CreditPayment />
            <CashPayment />
            <Total
              isInternational={shipping.isInternational}
              subtotal={subtotal}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

Payment.propTypes = {
  shipping: PropType.shape({
    isDone: PropType.bool,
    isInternational: PropType.bool
  }).isRequired,
  payment: PropType.shape({
    name: PropType.string,
    cardnumber: PropType.string,
    expiry: PropType.string,
    ccv: PropType.string,
    type: PropType.string
  }).isRequired,
  subtotal: PropType.number.isRequired
};

export default withCheckout(Payment);
