import {
  FETCH_LATEST_PRODUCTS_REQUEST,
  FETCH_LATEST_PRODUCTS_SUCCESS,
  FETCH_LATEST_PRODUCTS_FAIL,
} from '../types/latestProducts.js';

const initialState = { data: null, loading: true };

const latestProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LATEST_PRODUCTS_REQUEST:
      return { ...state, loading: true };

    case FETCH_LATEST_PRODUCTS_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case FETCH_LATEST_PRODUCTS_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default latestProductsReducer;
