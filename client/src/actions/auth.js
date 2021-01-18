import axios from '../axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT_SUCCESS,
  RESET_AUTH_ERROR,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  RESET_UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_WISH_PRODUCT_REQUEST,
  UPDATE_WISH_PRODUCT_SUCCESS,
  UPDATE_WISH_PRODUCT_FAIL,
  DELETE_WISH_PRODUCT_REQUEST,
  DELETE_WISH_PRODUCT_SUCCESS,
  DELETE_WISH_PRODUCT_FAIL,
} from '../types/auth';
import history from '../history';
import { RESET_ORDER } from '../types/order';

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const { data } = await axios.post('/api/users/login', { email, password });

    data.token.expirationDate = expirationDate(data);

    dispatch({ type: LOGIN_SUCCESS, payload: data });

    localStorage.setItem('auth', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    setTimeout(() => {
      dispatch({ type: RESET_AUTH_ERROR });
    }, 1500);
  }
};

export const signup = (name, email, password) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });

  try {
    const { data } = await axios.post('/api/users', { name, email, password });

    data.token.expirationDate = expirationDate(data);

    dispatch({ type: SIGNUP_SUCCESS, payload: data });

    localStorage.setItem('auth', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });

    setTimeout(() => {
      dispatch({ type: RESET_AUTH_ERROR });
    }, 1500);
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('auth');

  dispatch({ type: RESET_ORDER });
  dispatch({ type: LOGOUT_SUCCESS });

  history.push('/login');
};

export const updateUserProfile = (formValues) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_USER_PROFILE_REQUEST });

  try {
    const { data } = await axios.put('/api/users', formValues);

    dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, payload: data });

    localStorage.setItem('auth', JSON.stringify(getState().auth.data));

    setTimeout(() => {
      dispatch({ type: RESET_UPDATE_USER_PROFILE_SUCCESS });
    }, 1500);
  } catch (error) {
    dispatch({
      type: UPDATE_USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });

    setTimeout(() => {
      dispatch({ type: RESET_AUTH_ERROR });
    }, 1500);
  }
};

// optimistic update
export const updateWishProduct = (productId) => async (dispatch, getState) => {
  const prevAuth = getState().auth.data;

  dispatch({ type: UPDATE_WISH_PRODUCT_REQUEST, payload: productId });

  try {
    const { data } = await axios.put('/api/users/wishlist', { productId });

    dispatch({ type: UPDATE_WISH_PRODUCT_SUCCESS, payload: data });

    handleWishListInLocalStorage(productId, data);
  } catch (error) {
    dispatch({
      type: UPDATE_WISH_PRODUCT_FAIL,
      payload: {
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
        prevAuth,
      },
    });
  }
};

export const deleteWishProduct = (productId) => async (dispatch, getState) => {
  const prevAuth = getState().auth.data;
  dispatch({ type: DELETE_WISH_PRODUCT_REQUEST, payload: productId });

  try {
    await axios.delete(`/api/users/wishlist/${productId}`);
    dispatch({ type: DELETE_WISH_PRODUCT_SUCCESS });

    const newWishList = prevAuth.wishList.filter(
      (wish) => wish._id !== productId
    );

    handleWishListInLocalStorage(productId, newWishList);
  } catch (error) {
    dispatch({
      type: DELETE_WISH_PRODUCT_FAIL,
      payload: {
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
        prevAuth,
      },
    });
  }
};

const expirationDate = (data) => {
  const expiresInSec = +data.token.expiresIn;
  const now = new Date();

  return new Date(now.getTime() + expiresInSec * 1000).toISOString();
};

const handleWishListInLocalStorage = (productId, newWishList) => {
  const authFromStorage = JSON.parse(localStorage.getItem('auth'));
  const alreadyExisted = authFromStorage.wishList.find(
    (wish) => wish._id === productId
  );

  if (alreadyExisted) {
    authFromStorage.wishList = authFromStorage.wishList.filter(
      (wish) => wish._id !== productId
    );
  } else {
    authFromStorage.wishList = [...newWishList];
  }

  localStorage.setItem('auth', JSON.stringify(authFromStorage));
};
