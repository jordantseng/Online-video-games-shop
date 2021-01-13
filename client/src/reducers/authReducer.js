import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT_SUCCESS,
  RESET_AUTH_ERROR,
  UPDATE_LIKELIST_REQUEST,
  UPDATE_LIKELIST_SUCCESS,
  UPDATE_LIKELIST_FAIL,
} from '../types/auth';

const userInfoFromStorage = localStorage.getItem('auth')
  ? JSON.parse(localStorage.getItem('auth'))
  : null;

const initialState = {
  data: userInfoFromStorage,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true };

    case LOGIN_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SIGNUP_REQUEST:
      return { ...state, loading: true };

    case SIGNUP_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case SIGNUP_FAIL:
      return { ...state, loading: false, error: action.payload };

    case LOGOUT_SUCCESS:
      return { data: null };

    case RESET_AUTH_ERROR:
      return { ...state, error: null };

    case UPDATE_LIKELIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_LIKELIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          wishList: [...action.payload],
        },
      };

    case UPDATE_LIKELIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default authReducer;
