import {
  FETCH_REVIEWS_REQUEST,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
  RESET_CREATE_REVIEW,
} from '../types/reviews';

const initialState = {
  data: { reviews: [], page: null },
  loading: true,
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REVIEWS_REQUEST:
      return { ...state, loading: true };

    case FETCH_REVIEWS_SUCCESS:
      const { reviews, page } = action.payload;

      // first time get the reviews
      if (page.current === 1) {
        return {
          ...state,
          loading: false,
          data: {
            reviews,
            page,
          },
          hasMore: page.current === page.total ? false : true,
        };
      }
      return {
        ...state,
        loading: false,
        data: {
          reviews: [...state.data.reviews, ...reviews],
          page,
        },
        hasMore: page.current === page.total ? false : true,
      };

    case FETCH_REVIEWS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CREATE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
        creating: true,
      };

    case CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          reviews: [{ ...action.payload.review }, ...state.data.reviews],
          page: { ...action.payload.page },
        },

        success: true,
        creating: false,
      };

    case RESET_CREATE_REVIEW:
      return { ...state, success: undefined, creating: undefined };

    case CREATE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        creating: undefined,
      };

    default:
      return state;
  }
};

export default reviewsReducer;
