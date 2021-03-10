import React, { useReducer } from 'react';
import { LOGIN_USER, LOGOUT_USER } from '../types';
import UserReducer from './userReducer';
import UserContext from './userContext';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom'

const UserState = (props) => {
  const initialState = {
    user: {},
    isAuthenticated: false,
  };
  const history = useHistory();
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const loginUser = (user) => dispatch({ type: LOGIN_USER, payload: user });
  
  const logoutUser = async () => {
    const result = await Auth.signOut({ global: true })
    return dispatch({ type: LOGOUT_USER });
  } 

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
