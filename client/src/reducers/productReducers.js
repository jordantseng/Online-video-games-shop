import {
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REVIEW_REQUEST,
  CREATE_PRODUCT_REVIEW_SUCCESS,
  CREATE_PRODUCT_REVIEW_FAIL,
  RESET_PRODUCT,
} from '../types/product';

const initialState = { data: null, loading: true };

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return { ...state, loading: true };

    case FETCH_PRODUCT_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case FETCH_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_PRODUCT_REQUEST:
      return { ...state, loading: true };

    case UPDATE_PRODUCT_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case UPDATE_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CREATE_PRODUCT_REVIEW_REQUEST:
      return { ...state, loadingReview: true };

    case CREATE_PRODUCT_REVIEW_SUCCESS:
      return {
        loadingReview: false,
        data: {
          ...state.data,
          reviews: action.payload,
        },
      };

    case CREATE_PRODUCT_REVIEW_FAIL:
      return {
        ...state,
        loadingReview: false,
        errorReview: action.payload,
      };

    case RESET_PRODUCT:
      return {
        ...state,
        loadingReview: undefined,
        errorReview: undefined,
      };

    default:
      return state;
  }
};

export default productReducer;
