import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT_SUCCESS,
} from '../types/auth';

const userInfoFromStorage = localStorage.getItem('auth')
  ? JSON.parse(localStorage.getItem('auth'))
  : null;

const initialState = {
  user: userInfoFromStorage,
  loggedIn: userInfoFromStorage ? true : null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload, loggedIn: true };

    case LOGIN_FAIL:
      return { ...state, error: action.payload, loggedIn: null };

    case SIGNUP_SUCCESS:
      return { ...state, user: action.payload, loggedIn: true };

    case SIGNUP_FAIL:
      return { ...state, error: action.payload, loggedIn: null };

    case LOGOUT_SUCCESS:
      return { user: null, loggedIn: false };

    default:
      return state;
  }
};

export default authReducer;
