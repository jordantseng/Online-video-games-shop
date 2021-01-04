import axios from '../axios';
import {
  FETCH_POPULAR_PRODUCTS_REQUEST,
  FETCH_POPULAR_PRODUCTS_SUCCESS,
  FETCH_POPULAR_PRODUCTS_FAIL,
  FETCH_POPULAR_PRODUCTS_CANCELLED,
} from '../types/popularProducts';

export const fetchPopularProducts = (cancelToken) => async (dispatch) => {
  dispatch({ type: FETCH_POPULAR_PRODUCTS_REQUEST });

  try {
    const { data } = await axios.get('/api/products/popular', {
      cancelToken,
    });

    dispatch({ type: FETCH_POPULAR_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    if (axios.isCancel(error)) {
      dispatch({ type: FETCH_POPULAR_PRODUCTS_CANCELLED });
    } else {
      dispatch({
        type: FETCH_POPULAR_PRODUCTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  }
};
