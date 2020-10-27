import axios from 'axios';

import history from '../history';
import {
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
  RESET_PRODUCTS,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAIL,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REVIEW_SUCCESS,
  CREATE_PRODUCT_REVIEW_FAIL,
} from '../types/productList';

export const fetchProduct = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/products');
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  const prevProducts = getState().productList.products;

  dispatch({ type: RESET_PRODUCTS });

  try {
    const { data } = await axios.post(
      '/api/products',
      {},
      {
        headers: { Authorization: `Bearer ${getState().auth.user.token}` },
      }
    );
    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: [...prevProducts, data],
    });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.message
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  const prevProducts = getState().productList.products;

  try {
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });

    await axios.delete(`/api/products/${id}`, {
      headers: { Authorization: `Bearer ${getState().auth.user.token}` },
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: {
        error:
          error.response && error.response.message
            ? error.response.message
            : error.message,
        prevProducts,
      },
    });
  }
};

export const updateProduct = (id, formValues) => async (dispatch, getState) => {
  try {
    const { data } = await axios.put(`/api/products/${id}`, formValues, {
      headers: { Authorization: `Bearer ${getState().auth.user.token}` },
    });

    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
    history.push('/admin/productList');
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const createProductReview = (id, formValues) => async (
  dispatch,
  getState
) => {
  try {
    const { data } = await axios.post(
      `/api/products/${id}/reviews`,
      formValues,
      {
        headers: { Authorization: `Bearer ${getState().auth.user.token}` },
      }
    );

    dispatch({ type: CREATE_PRODUCT_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
