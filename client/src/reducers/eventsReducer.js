import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAIL,
  FETCH_EVENTS_CANCELLED,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAIL,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  RESET_EVENTS,
} from '../types/events';

const initialState = {
  data: null,
  loading: true,
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS_REQUEST:
      return { ...state, loading: true };

    case FETCH_EVENTS_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case FETCH_EVENTS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case FETCH_EVENTS_CANCELLED:
      return { ...state, loading: false };

    case CREATE_EVENT_REQUEST:
      return { ...state, loading: true };

    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload],
      };

    case CREATE_EVENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_EVENT_REQUEST:
      return {
        ...state,
        data: state.data.filter((event) => event._id !== action.payload),
      };

    case DELETE_EVENT_SUCCESS:
      return { ...state };

    case DELETE_EVENT_FAIL:
      return {
        ...state,
        data: action.payload.events,
        error: action.payload.error,
      };

    case RESET_EVENTS:
      return { loading: true, data: null };

    default:
      return state;
  }
};

export default eventsReducer;
