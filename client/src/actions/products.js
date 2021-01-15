import axios from '../axios';
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCTS_CANCELLED,
} from '../types/products';
import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
} from '../types/product';

export const fetchProducts = (
  keyword = '',
  category = '',
  pageNumber = 1,
  cancelToken
) => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST });

  try {
    const { data } = await axios.get(`/api/products`, {
      params: { keyword, category, pageNumber },
      cancelToken,
    });

    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    if (axios.isCancel(error)) {
      dispatch({ type: FETCH_PRODUCTS_CANCELLED });
    } else {
      dispatch({
        type: FETCH_PRODUCTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
};

export const createProduct = () => async (dispatch) => {
  dispatch({ type: CREATE_PRODUCT_REQUEST });

  try {
    const { data } = await axios.post('/api/products', {});

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
    await axios.delete(`/api/products/${id}`);

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
