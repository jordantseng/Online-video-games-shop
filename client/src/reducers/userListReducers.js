import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from '../types/userList';

const userListReducer = (state = { users: [], user: {} }, action) => {
  switch (action.type) {
    // admin

    case FETCH_USERS_SUCCESS:
      return { ...state, users: action.payload };

    case FETCH_USERS_FAIL:
      return { ...state, error: action.payload };

    case DELETE_USER_REQUEST:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };

    case DELETE_USER_SUCCESS:
      return { ...state };

    case DELETE_USER_FAIL:
      return {
        ...state,
        users: action.payload.users,
        error: action.payload.error,
      };

    case FETCH_USER_SUCCESS:
      return { ...state, user: action.payload };

    case FETCH_USER_FAIL:
      return { ...state, error: action.payload };

    case UPDATE_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload };

    case UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        user: { ...state.user, error: action.payload },
      };

    default:
      return state;
  }
};

export default userListReducer;
