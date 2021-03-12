import { LOGIN_USER, LOGOUT_USER, CURRENT_USER } from '../types';

const UserReducer = (state, action) => {
  console.log("user reducer", action)
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        //placeholder
        user: action.payload,
        isAuthenticated: true
      };
    case LOGOUT_USER:
      return {
        ...state,
        //placeholder
        user: null,
        isAuthenticated: false
      };
    case CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    default:
      return state;
  }
};

export default UserReducer;
