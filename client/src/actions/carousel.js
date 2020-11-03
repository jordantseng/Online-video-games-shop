import axios from 'axios';
import {
  FETCH_TOP_PRODUCTS_REQUEST,
  FETCH_TOP_PRODUCTS_SUCCESS,
  FETCH_TOP_PRODUCTS_FAIL,
} from '../types/carousel';

export const fetchTopProducts = () => async (dispatch) => {
  dispatch({ type: FETCH_TOP_PRODUCTS_REQUEST });

  try {
    const { data } = await axios.get('/api/products/top');
    dispatch({ type: FETCH_TOP_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_TOP_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
