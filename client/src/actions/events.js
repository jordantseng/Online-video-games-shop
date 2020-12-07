import axios from '../axios';

import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAIL,
} from '../types/events';

export const fetchEvents = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_EVENTS_REQUEST });

  try {
    const { data } = await axios.get('/api/events');

    dispatch({ type: FETCH_EVENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_EVENTS_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.message
          : error.response.data.message,
    });
  }
};
