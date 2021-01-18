import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProfileForm from '../components/ProfileForm';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { updateUserProfile } from '../actions/auth';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { loading, data: authUser, error, success } = useSelector(
    (state) => state.auth
  );

  const onUpdateUserClick = (name, email, password) => {
    dispatch(updateUserProfile({ name, email, password }));
  };

  return (
    <FormContainer>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error ? <Message variant='danger'>{error}</Message> : null}
          {success && <Message variant='success'>Update successfully</Message>}
          <h1>My Profile</h1>
          <ProfileForm user={authUser} onSubmitClick={onUpdateUserClick} />
        </>
      )}
    </FormContainer>
  );
};

export default UserProfile;
