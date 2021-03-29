import React, { useReducer } from 'react';
import {
  CURRENT_USER,
  LOGIN_USER,
  LOGOUT_USER,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  GET_MATCHES,
  GET_USERS,
} from '../types';
import UserReducer from './userReducer';
import UserContext from './userContext';
import { Auth, API } from 'aws-amplify';
import createMatch from './createMatch';

const UserState = (props) => {
  const initialState = {
    user: null,
    matches: [],
    isAuthenticated: false,
    loading: false,
    users: null,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const setLoadingTrue = () => dispatch({ type: SET_LOADING_TRUE });
  const setLoadingFalse = () => dispatch({ type: SET_LOADING_FALSE });

  //============================
  //        Scan Users
  //============================

  const scanUsers = async () => {
    const apiName = 'whiskamplify';
    const path = '/api/User';
    const userArray = await API.get(apiName, path);

    dispatch({
      type: GET_USERS,
      payload: userArray,
    });
  };

  //============================
  //  Get Current User Info
  //============================

  const getUserFromDB = (id) => {
    const apiName = 'whiskamplify';
    const path = `/api/object/User/${id}`;
    return API.get(apiName, path);
  };

  const getAuthenticatedUser = async () => {
    var info = await Auth.currentUserInfo();
    //console.log('user State', 'current user info:\n', info);
    var findUser = await getUserFromDB(info?.attributes.sub);
    const fullUser = Object.keys(findUser).length !== 0 ? findUser : null;

    console.log('fulluser>>', fullUser);
    dispatch({
      type: fullUser ? CURRENT_USER : LOGOUT_USER,
      payload: fullUser,
    });
  };


  const updateUserContext = async (id) => {
    var updatedUserDetails = await getUserFromDB(id);
    dispatch({ type: CURRENT_USER, payload: updatedUserDetails });
  }

  // ======================================
  //  User Authentication / Authorization
  // =======================================
  const postUser = (user) => {
    const apiName = 'whiskamplify';
    const path = `/api`;
    const myInit = {
      body: user, // replace this with attributes you need
      // headers: {}, // OPTIONAL
    };
    dispatch({ type: LOGIN_USER, payload: user });
    return API.post(apiName, path, myInit);
  };

  const loginUser = async (user) => {
    console.log('user sub>>', user.sub);
    const fullUser = await getUserFromDB(user.sub);
    console.log('fullUser>>>>>', fullUser);
    dispatch({ type: LOGIN_USER, payload: fullUser });
  };

  const logoutUser = async () => {
    await Auth.signOut({ global: true });
    return dispatch({ type: LOGOUT_USER });
  };

  //=======================
  //     Choose Whisk
  //=======================

  const chooseWhisk = async (user, whisk) => {
    try {
      user.chosenWhisks.unshift(whisk.ID);
      const apiName = 'whiskamplify';
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
    const filtered = user.chosenWhisks.filter((w) => w !== whiskId);
    user.chosenWhisks = filtered;
    const apiName = 'whiskamplify';
    const path = `/api`;
    const myInit = {
      body: user,
    };
    await API.post(apiName, path, myInit);
    return filtered;
  };

  //=======================
  //  Update User Profile
  //=======================
  const updateProfile = async (userInfo) => {
    const apiName = 'whiskamplify';
    const path = `/api`;
    const myInit = {
      body: userInfo,
    };
    await API.post(apiName, path, myInit);
    updateUserContext(userInfo.ID);
    
  };

  //===================================
  //  Get Match Docs for Current User
  //===================================

  const getData = async (matchId) => {
    const apiName = 'whiskamplify';
    const path = `/api/object/Match/${matchId}`;
    const myInit = {
      headers: {},
    };
    var result = await API.get(apiName, path, myInit);
    return Promise.resolve(result)
  }

  const saveMatchDataToContext = async (users, user, whisks) => {
    const allMatches = user.matches?.map(async (matchId) => {
      let matchDoc = null;
      try {
        matchDoc = await getData(matchId);
        matchDoc.whisk = whisks.find((w) => w.ID === matchDoc.whiskId);
        matchDoc.matchedUser = users.find((u) => u.ID === matchDoc.userIds[1]);
      } catch (e) {
        console.log('Error: ', e);
      }
      return matchDoc
    })

    Promise.all(allMatches).then(matchInfo => {
      dispatch({
        type: GET_MATCHES,
        payload: matchInfo,
      });
      return matchInfo;
    })

    // https://medium.com/@ian.mundy/async-map-in-javascript-b19439f0099
    // https://flaviocopes.com/javascript-async-await-array-map/
  };


  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        users: state.users,
        matches: state.matches,
        setLoadingFalse,
        setLoadingTrue,
        loginUser,
        logoutUser,
        scanUsers,
        getUserFromDB,
        getAuthenticatedUser,
        postUser,
        chooseWhisk,
        cancelChooseWhisk,
        updateProfile,
        createMatch,
        saveMatchDataToContext,
        updateUserContext
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
