import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT_SUCCESS,
  RESET_AUTH_ERROR,
} from '../types/auth';

const userInfoFromStorage = localStorage.getItem('auth')
  ? JSON.parse(localStorage.getItem('auth'))
  : null;

const initialState = {
  user: userInfoFromStorage,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true };

    case LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload };

    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SIGNUP_REQUEST:
      return { ...state, loading: true };

    case SIGNUP_SUCCESS:
      return { ...state, loading: false, user: action.payload };

    case SIGNUP_FAIL:
      return { ...state, loading: false, error: action.payload };

    case LOGOUT_SUCCESS:
      return { user: null };

    case RESET_AUTH_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

export default authReducer;
