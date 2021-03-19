import {
  LOGIN_USER,
  LOGOUT_USER,
  CURRENT_USER,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
} from '../types';

const UserReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        //placeholder
        user: action.payload,
        isAuthenticated: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        //placeholder
        user: null,
        isAuthenticated: false,
      };
    case CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case SET_LOADING_TRUE:
      return {
        ...state,
        loading: true,
      };
    case SET_LOADING_FALSE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default UserReducer;
