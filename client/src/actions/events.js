import axios from '../axios';

import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAIL,
  FETCH_EVENTS_CANCELLED,
} from '../types/events';

export const fetchEvents = (cancelToken) => async (dispatch, getState) => {
  dispatch({ type: FETCH_EVENTS_REQUEST });

  try {
    const { data } = await axios.get('/api/events', { cancelToken });

    dispatch({ type: FETCH_EVENTS_SUCCESS, payload: data });
  } catch (error) {
    if (axios.isCancel(error)) {
      dispatch({ type: FETCH_EVENTS_CANCELLED });
    } else {
      dispatch({
        type: FETCH_EVENTS_FAIL,
        payload:
          error.response && error.response.message
            ? error.response.data.message
            : error.response.message,
      });
    }
  }
};
