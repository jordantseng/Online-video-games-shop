import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAIL,
  FETCH_EVENTS_CANCELLED,
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

    case RESET_EVENTS:
      return { loading: true, data: null };

    default:
      return state;
  }
};

export default eventsReducer;
