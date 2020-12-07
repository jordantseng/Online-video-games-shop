import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';

import { savePaymentMethod } from '../actions/cart';

import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import Input from '../components/Input';
import Meta from '../components/Meta';

const Payment = ({ history }) => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const onFormSubmit = ({ paymentMethod }) => {
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <>
      <Meta title='Payment' />

      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment method</h1>
        <Formik
          initialValues={{ paymentMethod: 'Paypal' }}
          onSubmit={onFormSubmit}>
          {() => (
            <Form>
              <Input
                label='Paypal or Credit Card'
                type='radio'
                name='paymentMethod'
                value='Paypal'
              />
              <Input
                label='Free'
                type='radio'
                name='paymentMethod'
                value='Free'
              />
              <Button
                className='d-block ml-auto'
                type='submit'
                variant='primary'>
                Continue
              </Button>
            </Form>
          )}
        </Formik>
      </FormContainer>
    </>
  );
};

export default Payment;
