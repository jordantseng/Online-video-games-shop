import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT_SUCCESS,
  RESET_AUTH_ERROR,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  RESET_UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_WISH_PRODUCT_REQUEST,
  UPDATE_WISH_PRODUCT_SUCCESS,
  UPDATE_WISH_PRODUCT_FAIL,
  DELETE_WISH_PRODUCT_REQUEST,
  DELETE_WISH_PRODUCT_SUCCESS,
  DELETE_WISH_PRODUCT_FAIL,
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

    case UPDATE_USER_PROFILE_REQUEST:
      return { ...state, loading: true };

    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...action.payload },
        loading: false,
        success: true,
      };

    case UPDATE_USER_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case RESET_UPDATE_USER_PROFILE_SUCCESS:
      return { ...state, success: undefined };

    // clean up error message after 1.5 sec
    case RESET_AUTH_ERROR:
      return { ...state, error: null };

    case UPDATE_WISH_PRODUCT_REQUEST:
      const alreadyExisted = state.data.wishList.find(
        (wish) => wish._id === action.payload
      );

      const result = alreadyExisted
        ? state.data.wishList.filter((wish) => wish._id !== action.payload)
        : [...state.data.wishList, { _id: action.payload }];

      return {
        ...state,
        data: {
          ...state.data,
          wishList: result,
        },
      };

    case UPDATE_WISH_PRODUCT_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          wishList: [...action.payload],
        },
      };

    case UPDATE_WISH_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload.error,
        data: action.payload.prevAuth,
      };

    case DELETE_WISH_PRODUCT_REQUEST:
      return {
        ...state,
        data: {
          ...state.data,
          wishList: state.data.wishList.filter(
            (wish) => wish._id !== action.payload
          ),
        },
      };

    case DELETE_WISH_PRODUCT_SUCCESS:
      return { ...state };

    case DELETE_WISH_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: action.payload.prevAuth,
      };

    default:
      return state;
  }
};

export default authReducer;
