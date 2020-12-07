import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';

import {
  signupFormValidationSchema,
  profileFormValidationSchema,
} from '../validations';

import Input from '../components/Input';

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const validate = ({ password, confirmPassword }) => {
  let errors = {};
  if (password !== confirmPassword) {
    errors.confirmPassword = 'Password not matched';
  }
  return errors;
};

const ProfileForm = ({ user, userInfo, onSubmitClick }) => {
  const [savedFormValues, setSavedFormValues] = useState(null);

  const validationSchema = userInfo
    ? profileFormValidationSchema
    : signupFormValidationSchema;

  useEffect(() => {
    if (userInfo) {
      setSavedFormValues({ ...userInfo, password: '', confirmPassword: '' });
    }
  }, [userInfo, setSavedFormValues]);

  const onSubmit = ({ name, email, password }) => {
    onSubmitClick(name, email, password);
  };

  return (
    <Formik
      initialValues={savedFormValues || initialValues}
      validationSchema={validationSchema}
      validate={validate}
      onSubmit={onSubmit}
      enableReinitialize>
      {({ values, isSubmitting }) => (
        <Form>
          <Input label='Name' name='name' type='text' />
          <Input
            label='Email'
            name='email'
            type='email'
            disabled={userInfo && values.email}
          />
          <Input label='Password' name='password' type='password' />
          <Input
            label='Confirm Password'
            name='confirmPassword'
            type='password'
          />
          <Button
            className='d-block ml-auto'
            type='submit'
            variant='primary'
            disabled={isSubmitting}>
            {user ? 'Update' : 'Sign Up'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

ProfileForm.propTypes = {
  user: PropTypes.object,
  userInfo: PropTypes.object,
  onSubmitClick: PropTypes.func.isRequired,
};

export default ProfileForm;
