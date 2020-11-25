import axios from 'axios';
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
} from '../types/products';

export const fetchProducts = (
  keyword = '',
  category = '',
  pageNumber
) => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST });

  try {
    const { data } = await axios.get(
      `/api/products?keyword=${keyword}&category=${category}&pageNumber=${pageNumber}`
    );

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
  dispatch({ type: CREATE_PRODUCT_REQUEST });

  try {
    const { data } = await axios.post(
      '/api/products',
      {},
      {
        headers: { Authorization: `Bearer ${getState().auth.user.token.id}` },
      }
    );

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data,
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

// optimistic update
export const deleteProduct = (id) => async (dispatch, getState) => {
  const prevProducts = getState().products.data;

  dispatch({ type: DELETE_PRODUCT_REQUEST, payload: id });

  try {
    await axios.delete(`/api/products/${id}`, {
      headers: { Authorization: `Bearer ${getState().auth.user.token.id}` },
    });

    dispatch({ type: DELETE_PRODUCT_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: {
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        prevProducts,
      },
    });
  }
};
