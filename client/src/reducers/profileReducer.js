import {
  FETCH_USER_PROFILE_REQUEST,
  FETCH_USER_PROFILE_FAIL,
  FETCH_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  RESET_UPDATE_USER_PROFILE,
  RESET_PROFILE,
} from '../types/profile';

const initialState = { data: null, loading: true };

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_PROFILE_REQUEST:
      return { ...state, loading: true };

    case FETCH_USER_PROFILE_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case FETCH_USER_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_USER_PROFILE_REQUEST:
      return { ...state, updating: true };

    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        updating: false,
        success: true,
      };

    case UPDATE_USER_PROFILE_FAIL:
      return { ...state, error: action.payload };

    case RESET_UPDATE_USER_PROFILE:
      return { ...state, updating: undefined, success: undefined };

    case RESET_PROFILE:
      return initialState;

    default:
      return state;
  }
};

export default profileReducer;
