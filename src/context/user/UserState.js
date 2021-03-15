import React, { useEffect, useReducer } from 'react';
import { CURRENT_USER, LOGIN_USER, LOGOUT_USER, CHOOSE_WHISK } from '../types';
import UserReducer from './userReducer';
import UserContext from './userContext';
import { Auth, API } from 'aws-amplify';
import { useHistory } from 'react-router-dom';

const UserState = (props) => {
  const initialState = {
    user: {},
    isAuthenticated: false,
  };
  const history = useHistory();
  const [state, dispatch] = useReducer(UserReducer, initialState);

  useEffect(() => {
    const getInfo = async () => {
      var info = await Auth.currentUserInfo();
      //console.log('user State', 'current user info:\n', info);
      const fullUser = await getUser(info?.attributes.sub);
      //console.log('fulluser>>', fullUser);
      dispatch({
        type: fullUser ? CURRENT_USER : LOGOUT_USER,
        payload: fullUser,
      });
    };
    getInfo();
  }, []);

  const getAllUsers = (myInit) => {
    const apiName = 'WhiskPro';
    const path = '/api/User';
    return API.get(apiName, path);
  };

  const getUser = (id) => {
    const apiName = 'WhiskPro';
    const path = `/api/object/User/${id}`;
    return API.get(apiName, path);
  };

  const postUser = (user) => {
    const apiName = 'WhiskPro';
    const path = `/api`;
    const myInit = {
      body: user, // replace this with attributes you need
      // headers: {}, // OPTIONAL
    };
    dispatch({ type: LOGIN_USER, payload: user });
    return API.post(apiName, path, myInit);
  };

  // const loginUser = (user) => dispatch({ type: LOGIN_USER, payload: user });

  const loginUser = async (user) => {
    console.log('user sub>>', user.sub);
    const fullUser = await getUser(user.sub);
    console.log('fullUser>>>>>', fullUser);
    dispatch({ type: LOGIN_USER, payload: fullUser });
  };

  const logoutUser = async () => {
    const result = await Auth.signOut({ global: true });
    return dispatch({ type: LOGOUT_USER });
  };

  //=======================
  //     Choose Whisk
  //=======================
  //push whisk to user's chosenWhisks array
  //send updated user object to DB
  //ensure user state is up to date
  const chooseWhisk = async (user, whisk) => {
    try {
      user.ChosenWhisks.unshift(whisk.ID);
      const apiName = 'WhiskPro';
      const path = `/api`;
      const myInit = {
        body: user,
      };
      //dispatch({ type: LOGIN_USER, payload: user });
      return API.post(apiName, path, myInit);
    } catch (e) {
      console.log(e);
    }
    return;
  };

  //=======================
  //  Cancel Choose Whisk
  //=======================

  const cancelChooseWhisk = async (user, whiskId) => {
    const filtered = user.ChosenWhisks.filter((w) => w !== whiskId);
    user.ChosenWhisks = filtered;
    const apiName = 'WhiskPro';
    const path = `/api`;
    const myInit = {
      body: user,
    };
    await API.post(apiName, path, myInit);
    return filtered;
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loginUser,
        logoutUser,
        getAllUsers,
        getUser,
        postUser,
        chooseWhisk,
        cancelChooseWhisk,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
