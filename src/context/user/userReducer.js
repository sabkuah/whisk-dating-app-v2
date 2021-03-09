import { LOGIN_USER, LOGOUT_USER } from '../types';

const UserReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      console.log("logging in user", action.payload)
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
        user: {},
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default UserReducer;
