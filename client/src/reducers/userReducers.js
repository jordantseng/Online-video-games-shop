import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  RESET_USER,
} from '../types/user';

const initialState = { loading: true };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { ...state, loading: true };

    case FETCH_USER_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case FETCH_USER_FAIL:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_USER_REQUEST:
      return { ...state, loading: true };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        updated: true,
      };

    case UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        userError: action.payload,
      };

    case RESET_USER:
      return { ...state, updated: undefined };

    default:
      return state;
  }
};

export default userReducer;
