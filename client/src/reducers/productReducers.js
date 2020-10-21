import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  PRODUCT_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
} from '../actions/types';

export const productListReducer = (
  state = { products: [], product: {} },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };

    case PRODUCT_LIST_SUCCESS:
      return { ...state, loading: false, products: action.payload };

    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };

    case PRODUCT_CREATE_REQUEST:
      return { ...state, loading: true };

    case PRODUCT_CREATE_SUCCESS:
      return { ...state, loading: false, product: action.payload };

    case PRODUCT_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case PRODUCT_CREATE_RESET:
      return { products: [], product: null };

    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };

    case PRODUCT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload.error,
        products: action.payload.originalProducts,
      };

    default:
      return state;
  }
};

export const productReducer = (
  state = { loading: true, product: {} },
  action
) => {
  switch (action.type) {
    case PRODUCT_REQUEST:
      return { ...state };

    case PRODUCT_SUCCESS:
      return { loading: false, product: action.payload };

    case PRODUCT_FAIL:
      return { loading: false, error: action.payload };

    case PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        success: true,
      };

    case PRODUCT_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case PRODUCT_UPDATE_RESET:
      return { product: {} };

    default:
      return state;
  }
};
