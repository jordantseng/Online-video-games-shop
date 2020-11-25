import axios from 'axios';
import {
  FETCH_EVENT_REQUEST,
  FETCH_EVENT_SUCCESS,
  FETCH_EVENT_FAIL,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
} from '../types/event';
import history from '../history';

export const fetchEvent = (id) => async (dispatch, getState) => {
  dispatch({ type: FETCH_EVENT_REQUEST });

  try {
    const { data } = await axios.get(`/api/events/${id}`, {
      headers: { Authorization: `Bearer ${getState().auth.user.token.id}` },
    });

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

export const updateEvent = (id, formValues) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_EVENT_REQUEST });
  try {
    const formData = new FormData();
    const { title, description, redirectUrl, eventImg } = formValues;

    formData.append('title', title);
    formData.append('description', description);
    formData.append('redirectUrl', redirectUrl);
    formData.append('eventImg', eventImg);

    const { data } = await axios.put(`/api/events/${id}`, formData, {
      headers: { Authorization: `Bearer ${getState().auth.user.token.id}` },
    });

    dispatch({ type: UPDATE_EVENT_SUCCESS, payload: data });

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
