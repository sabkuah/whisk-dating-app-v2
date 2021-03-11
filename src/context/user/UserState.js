import React, { useEffect, useReducer } from 'react';
import { CURRENT_USER, LOGIN_USER, LOGOUT_USER } from '../types';
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


  useEffect(() => {
    const getInfo = async () => {
      var info = await Auth.currentUserInfo()
      console.log("user State", "current user info:\n", info)
      dispatch({
        type: info ? CURRENT_USER : LOGOUT_USER,
        payload: info?.attributes
      })
    }
    getInfo()
  }, []);


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
