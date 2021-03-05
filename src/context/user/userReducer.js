import { LOGIN_USER, LOGOUT_USER } from '../types';

const UserReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        //placeholder
      };
    case LOGOUT_USER:
      return {
        ...state,
        //placeholder
      };
    default:
      return state;
  }
};

export default UserReducer;
