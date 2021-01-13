import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from '../axios';
import { fetchUserProfile, updateUserProfile } from '../actions/profile';

import ProfileForm from '../components/ProfileForm';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { loading, data: profile, error, success } = useSelector(
    (state) => state.profile
  );
  const { data: user } = useSelector((state) => state.auth);

  useEffect(() => {
    const source = axios.CancelToken.source();

    if (!profile) {
      dispatch(fetchUserProfile(source.token));
    }

    return () => {
      source.cancel();
    };
  }, [dispatch, profile]);

  const onUpdateProfileClick = (name, email, password) => {
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
          <ProfileForm
            user={user}
            userInfo={profile}
            onSubmitClick={onUpdateProfileClick}
          />
        </>
      )}
    </FormContainer>
  );
};

export default UserProfile;
