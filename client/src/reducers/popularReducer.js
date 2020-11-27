import {
  FETCH_POPULAR_PRODUCTS_REQUEST,
  FETCH_POPULAR_PRODUCTS_SUCCESS,
  FETCH_POPULAR_PRODUCTS_FAIL,
} from '../types/popularProducts';

const initialState = { data: null, loading: true };

const popularReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POPULAR_PRODUCTS_REQUEST:
      return { ...state, loading: true };

    case FETCH_POPULAR_PRODUCTS_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case FETCH_POPULAR_PRODUCTS_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default popularReducer;
