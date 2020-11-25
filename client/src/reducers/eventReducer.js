import {
  FETCH_EVENT_REQUEST,
  FETCH_EVENT_SUCCESS,
  FETCH_EVENT_FAIL,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
} from '../types/event';

const initialState = {
  data: null,
  loading: true,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENT_REQUEST:
      return { ...state, loading: true };

    case FETCH_EVENT_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case FETCH_EVENT_FAIL:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_EVENT_REQUEST:
      return { ...state, loading: true };

    case UPDATE_EVENT_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case UPDATE_EVENT_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default eventReducer;
