import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';

import { saveShippingAddress } from '../actions/cart';

import { addressFormValidationSchema } from '../validations';

import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import Input from '../components/Input';
import Meta from '../components/Meta';

const initialValues = {
  address: '',
  city: '',
  postalCode: '',
  country: '',
};

const Shipping = () => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const onFormSubmit = (addressFormValues) => {
    dispatch(saveShippingAddress(addressFormValues));
  };

  return (
    <>
      <Meta title='Shipping' />
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Shipping Address</h1>
        <Formik
          initialValues={shippingAddress || initialValues}
          validationSchema={addressFormValidationSchema}
          onSubmit={onFormSubmit}
          enableReinitialize>
          {() => (
            <Form>
              <Input label='Address' name='address' type='text' />
              <Input label='City' name='city' type='text' />
              <Input label='Post Code' name='postalCode' type='text' />
              <Input label='Country' name='country' type='text' />
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

export default Shipping;
