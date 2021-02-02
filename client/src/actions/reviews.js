import axios from '../axios';
import {
  FETCH_REVIEWS_REQUEST,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
} from '../types/reviews';

export const fetchReviews = (productId, pageNumber) => async (dispatch) => {
  dispatch({ type: FETCH_REVIEWS_REQUEST });

  try {
    const { data } = await axios.get(
      `/api/reviews/${productId}?page=${pageNumber}`
    );

    dispatch({ type: FETCH_REVIEWS_SUCCESS, payload: data });
  } catch (error) {}
};

export const createReview = (productId, formValues) => async (
  dispatch,
  getState
) => {
  const name = getState().auth.data.name;
  const createdAt = new Date(Date.now()).toISOString().split('T')[0];

  dispatch({
    type: CREATE_REVIEW_REQUEST,
    payload: { ...formValues, name, createdAt },
  });

  try {
    const { data } = await axios.post(`/api/reviews/${productId}`, formValues);

    dispatch({ type: CREATE_REVIEW_SUCCESS, payload: data });
  } catch (error) {}
};
