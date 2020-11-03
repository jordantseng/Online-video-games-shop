import {
  FETCH_TOP_PRODUCTS_REQUEST,
  FETCH_TOP_PRODUCTS_SUCCESS,
  FETCH_TOP_PRODUCTS_FAIL,
} from '../types/carousel';

const initialState = { data: null, loading: true };

const carouselReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOP_PRODUCTS_REQUEST:
      return { ...state, loading: true };

    case FETCH_TOP_PRODUCTS_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case FETCH_TOP_PRODUCTS_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default carouselReducer;
