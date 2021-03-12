import React, { useEffect, useReducer } from 'react';
import { CURRENT_USER, LOGIN_USER, LOGOUT_USER } from '../types';
import UserReducer from './userReducer';
import UserContext from './userContext';
import { Auth, API } from 'aws-amplify';
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

  const getAllUsers = (myInit) => {
    const apiName = 'WhiskPro';
    const path = '/api/User'
    return API.get(apiName, path)
  }
  
  const getUser = (id) => {
    const apiName = 'WhiskPro';
    const path = `/api/object/User/${id}`
    return API.get(apiName, path)
  }

  const postUser = (user) => {
    const apiName = 'WhiskPro';
    const path = `/api`
    const myInit = {
      body: user, // replace this with attributes you need
      // headers: {}, // OPTIONAL
  };
    return API.post(apiName, path, myInit)
  }

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
        getAllUsers,
        getUser,
        postUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
