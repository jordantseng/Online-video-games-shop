import {
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAIL,
  FETCH_PRODUCT_CANCELLED,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RATING_AND_NUM_REVIEWS,
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

    case FETCH_PRODUCT_CANCELLED:
      return { ...state, loading: false };

    case UPDATE_PRODUCT_REQUEST:
      return { ...state, loading: true };

    case UPDATE_PRODUCT_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case UPDATE_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_PRODUCT_RATING_AND_NUM_REVIEWS:
      return {
        ...state,
        data: {
          ...state.data,
          numReviews: state.data.numReviews + 1,
          rating:
            (action.payload + state.data.rating * state.data.numReviews) /
            (state.data.numReviews + 1),
        },
      };

    default:
      return state;
  }
};

export default productReducer;
