import {
  // FETCH_USER_DETAILS_REQUEST,
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_USER_DETAILS_FAIL,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAIL,
  UPDATE_USER_DETAILS_REQUEST,
  UPDATE_USER_DETAILS_RESET,
} from '../types/profile';

import axios from 'axios';

export const fetchUserDetails = () => async (dispatch, getState) => {
  try {
    // dispatch({ type: FETCH_USER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${getState().auth.user.token}`,
      },
    });

    dispatch({ type: FETCH_USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const updateUserDetails = (formValues) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_USER_DETAILS_REQUEST });
  try {
    const { data } = await axios.put('/api/users/profile', formValues, {
      headers: { Authorization: `Bearer ${getState().auth.user.token}` },
    });

    dispatch({ type: UPDATE_USER_DETAILS_SUCCESS, payload: data });

    setTimeout(() => {
      dispatch({ type: UPDATE_USER_DETAILS_RESET });
    }, 1000);
  } catch (error) {
    dispatch({
      type: UPDATE_USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
