import {
  FETCH_USER_PROFILE_REQUEST,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  RESET_UPDATE_USER_PROFILE,
} from '../types/profile';

import axios from 'axios';

export const fetchUserProfile = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_USER_PROFILE_REQUEST });

  try {
    const { data } = await axios.get(`/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${getState().auth.user.token.id}`,
      },
    });

    dispatch({ type: FETCH_USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const updateUserProfile = (formValues) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_USER_PROFILE_REQUEST });

  try {
    const { data } = await axios.put('/api/users/profile', formValues, {
      headers: { Authorization: `Bearer ${getState().auth.user.token.id}` },
    });

    dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, payload: data });

    setTimeout(() => {
      dispatch({ type: RESET_UPDATE_USER_PROFILE });
    }, 1500);
  } catch (error) {
    dispatch({
      type: UPDATE_USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
