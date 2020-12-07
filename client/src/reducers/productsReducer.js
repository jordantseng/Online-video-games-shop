import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
  RESET_PRODUCTS,
} from '../types/products';

import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
} from '../types/product';

const initialState = {
  data: null,
  loading: true,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.products,
        page: action.payload.page,
      };

    case FETCH_PRODUCTS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CREATE_PRODUCT_REQUEST:
      return { ...state, loading: true };

    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload],
      };

    case CREATE_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };

    // optimistic update
    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        data: state.data.filter((product) => product._id !== action.payload),
      };

    case DELETE_PRODUCT_SUCCESS:
      return { ...state };

    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        data: action.payload.prevProducts,
        error: action.payload.error,
      };

    case RESET_PRODUCTS:
      return { data: null, loading: true };

    default:
      return state;
  }
};

export default productsReducer;
