import axios from '../axios';

import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAIL,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAIL,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
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

export const createEvent = () => async (dispatch, getState) => {
  dispatch({ type: CREATE_EVENT_REQUEST });

  try {
    const { data } = await axios.post('/api/events', {});

    dispatch({ type: CREATE_EVENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_EVENT_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.message
          : error.response,
    });
  }
};

// optismistic update
export const deleteEvent = (id) => async (dispatch, getState) => {
  const prevEvents = getState().events.data;

  dispatch({ type: DELETE_EVENT_REQUEST, payload: id });

  try {
    await axios.delete(`/api/events/${id}`);

    dispatch({ type: DELETE_EVENT_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_EVENT_FAIL,
      payload: {
        error:
          error.response && error.response.message
            ? error.response.message
            : error.response.data.message,
        events: prevEvents,
      },
    });
  }
};
