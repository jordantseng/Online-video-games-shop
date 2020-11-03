import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from '../types/users';

const initialState = { data: null, loading: true };

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { loading: true };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.users,
        page: action.payload.page,
      };

    case FETCH_USERS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case DELETE_USER_REQUEST:
      return {
        ...state,
        data: state.data.filter((user) => user._id !== action.payload),
      };

    case DELETE_USER_SUCCESS:
      return { ...state };

    case DELETE_USER_FAIL:
      return {
        ...state,
        data: action.payload.users,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default usersReducer;
