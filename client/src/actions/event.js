import axios from '../axios';
import {
  FETCH_EVENT_REQUEST,
  FETCH_EVENT_SUCCESS,
  FETCH_EVENT_FAIL,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
  FETCH_EVENT_CANCELLED,
} from '../types/event';
import { RESET_EVENTS } from '../types/events';
import history from '../history';

export const fetchEvent = (id, cancelToken) => async (dispatch, getState) => {
  dispatch({ type: FETCH_EVENT_REQUEST });

  try {
    const { data } = await axios.get(`/api/events/${id}`, { cancelToken });

    dispatch({ type: FETCH_EVENT_SUCCESS, payload: data });
  } catch (error) {
    if (axios.isCancel(error)) {
      dispatch({
        type: FETCH_EVENT_CANCELLED,
      });
    } else {
      dispatch({
        type: FETCH_EVENT_FAIL,
        payload:
          error.response && error.response.message
            ? error.response.message
            : error.response.data.message,
      });
    }
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
