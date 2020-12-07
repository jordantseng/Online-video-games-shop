import axios from '../axios';
import {
  FETCH_EVENT_REQUEST,
  FETCH_EVENT_SUCCESS,
  FETCH_EVENT_FAIL,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAIL,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
} from '../types/event';
import { RESET_EVENTS } from '../types/events';
import history from '../history';

export const fetchEvent = (id) => async (dispatch, getState) => {
  dispatch({ type: FETCH_EVENT_REQUEST });

  try {
    const { data } = await axios.get(`/api/events/${id}`);

    dispatch({ type: FETCH_EVENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_EVENT_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.message
          : error.response.data.message,
    });
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

export const updateEvent = (id, formValues) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_EVENT_REQUEST });
  try {
    const formData = new FormData();
    const { redirectUrl, eventImg } = formValues;

    formData.append('redirectUrl', redirectUrl);
    formData.append('eventImg', eventImg);

    const { data } = await axios.patch(`/api/events/${id}`, formData);

    dispatch({ type: UPDATE_EVENT_SUCCESS, payload: data });

    dispatch({ type: RESET_EVENTS });
    history.push('/admin/eventList');
  } catch (error) {
    dispatch({
      type: UPDATE_EVENT_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.message
          : error.response.data.message,
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
