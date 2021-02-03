import axios from '../axios';
import {
  FETCH_REVIEWS_REQUEST,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
} from '../types/reviews';
import { UPDATE_PRODUCT_RATING_AND_NUM_REVIEWS } from '../types/product';

export const fetchReviews = (productId, pageNumber) => async (dispatch) => {
  dispatch({ type: FETCH_REVIEWS_REQUEST });

  try {
    const { data } = await axios.get(
      `/api/reviews/${productId}?page=${pageNumber}`
    );

    dispatch({ type: FETCH_REVIEWS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_REVIEWS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const createReview = (productId, formValues) => async (dispatch) => {
  dispatch({
    type: CREATE_REVIEW_REQUEST,
  });

  try {
    const { data } = await axios.post(`/api/reviews/${productId}`, formValues);

    dispatch({ type: CREATE_REVIEW_SUCCESS, payload: data });

    dispatch({
      type: UPDATE_PRODUCT_RATING_AND_NUM_REVIEWS,
      payload: data.review.rating,
    });
  } catch (error) {
    dispatch({
      type: CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
