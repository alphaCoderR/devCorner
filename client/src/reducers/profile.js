import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_ALL_PROFILES,
  GET_REPOS,
} from "../actions/constants";

const initialState = {
  profile: null, // Stores all our profile data
  profiles: [], // Stores the profiles of the developers
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_PROFILE:
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: payload,
      };
    case GET_ALL_PROFILES:
      return {
        ...state,
        loading: false,
        profiles: payload,
      };
    case GET_REPOS:
      return {
        ...state,
        loading: false,
        repos: payload,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case CLEAR_PROFILE:
      state = {};
      return state;
    default:
      return state;
  }
}
