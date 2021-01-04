import axios from '../axios';
import {
  FETCH_USER_PROFILE_REQUEST,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  FETCH_USER_PROFILE_CANCELLED,
  RESET_UPDATE_USER_PROFILE,
} from '../types/profile';
import { LOGIN_SUCCESS } from '../types/auth';

export const fetchUserProfile = (cancelToken) => async (dispatch, getState) => {
  dispatch({ type: FETCH_USER_PROFILE_REQUEST });

  try {
    const { data } = await axios.get(`/api/users/profile`, { cancelToken });

    dispatch({ type: FETCH_USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    if (axios.isCancel(error)) {
      dispatch({ type: FETCH_USER_PROFILE_CANCELLED });
    } else {
      dispatch({
        type: FETCH_USER_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  }
};

export const updateUserProfile = (formValues) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_USER_PROFILE_REQUEST });

  try {
    const { data } = await axios.put('/api/users/profile', formValues);

    dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, payload: data });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { ...getState().auth.user, name: data.name },
    });
    localStorage.setItem('auth', JSON.stringify(getState().auth.user));

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
