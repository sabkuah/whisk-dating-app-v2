import React, { useReducer } from 'react';
import { LOGIN_USER, LOGOUT_USER } from '../types';
import UserReducer from './userReducer';
import UserContext from './userContext';

const UserState = (props) => {
  const initialState = {
    user: {},
    isAuthenticated: false,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const loginUser = () => dispatch({ type: LOGIN_USER });
  const logoutUser = () => dispatch({ type: LOGOUT_USER });

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loginUser,
        logoutUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
