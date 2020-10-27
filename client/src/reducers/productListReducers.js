import {
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
  RESET_PRODUCTS,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAIL,
  // RESET_PRODUCT,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
} from '../types/productList';

const productListReducer = (state = { products: [], product: {} }, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        error: null,
      };

    case FETCH_PRODUCTS_FAIL:
      return { ...state, error: action.payload };

    case RESET_PRODUCTS:
      return { ...state, products: [] };

    case FETCH_PRODUCT_SUCCESS:
      return { ...state, product: action.payload, error: null };

    case FETCH_PRODUCT_FAIL:
      return { ...state, error: action.payload };

    // case RESET_PRODUCT:
    //   return { ...state, product: {} };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };

    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload.error,
        products: action.payload.prevProducts,
      };

    case CREATE_PRODUCT_SUCCESS:
      return { ...state, products: action.payload };

    case CREATE_PRODUCT_FAIL:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default productListReducer;
