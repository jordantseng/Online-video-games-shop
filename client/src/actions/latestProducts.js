import axios from '../axios';
import {
  FETCH_LATEST_PRODUCTS_REQUEST,
  FETCH_LATEST_PRODUCTS_SUCCESS,
  FETCH_LATEST_PRODUCTS_FAIL,
  FETCH_LATEST_PRODUCTS_CANCELLED,
} from '../types/latestProducts';

export const fetchLatestProducts = (cancelToken) => async (
  dispatch,
  getState
) => {
  dispatch({ type: FETCH_LATEST_PRODUCTS_REQUEST });

  try {
    const { data } = await axios.get('/api/products/latest', {
      cancelToken,
    });

    dispatch({ type: FETCH_LATEST_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    if (axios.isCancel(error)) {
      dispatch({ type: FETCH_LATEST_PRODUCTS_CANCELLED });
    } else {
      dispatch({
        type: FETCH_LATEST_PRODUCTS_FAIL,
        payload:
          error.response && error.response.message
            ? error.response.message
            : error.response.data.message,
      });
    }
  }
};
