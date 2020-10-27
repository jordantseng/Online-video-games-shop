import {
  FETCH_USER_DETAILS_FAIL,
  FETCH_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAIL,
  UPDATE_USER_DETAILS_REQUEST,
  UPDATE_USER_DETAILS_RESET,
  RESET_USER_DETAILS,
} from '../types/profile';

const profileReducer = (state = { details: {} }, action) => {
  switch (action.type) {
    case FETCH_USER_DETAILS_SUCCESS:
      return { ...state, details: action.payload };

    case FETCH_USER_DETAILS_FAIL:
      return { ...state, error: action.payload };

    case UPDATE_USER_DETAILS_REQUEST:
      return { ...state, updating: true };

    case UPDATE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        details: action.payload,
        updating: false,
        success: true,
      };

    case UPDATE_USER_DETAILS_FAIL:
      return { ...state, error: action.payload };

    case UPDATE_USER_DETAILS_RESET:
      return { ...state, success: null };

    case RESET_USER_DETAILS:
      return { ...state, details: {} };

    default:
      return state;
  }
};

export default profileReducer;
