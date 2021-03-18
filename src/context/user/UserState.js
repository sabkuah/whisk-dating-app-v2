import React, { useReducer } from 'react';
import {
  CURRENT_USER,
  LOGIN_USER,
  LOGOUT_USER,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  GET_MATCHES,
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
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  // useEffect(() => {
  //   //getAuthenticatedUser();
  //   (async () => {
  //     await getAuthenticatedUser();
  //     return;
  //   })();
  // }, []);

  const setLoadingTrue = () => dispatch({ type: SET_LOADING_TRUE });
  const setLoadingFalse = () => dispatch({ type: SET_LOADING_FALSE });

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

  const getAllUsers = () => {
    const apiName = 'WhiskPro';
    const path = '/api/User';
    return API.get(apiName, path);
  };

  const getUserFromDB = (id) => {
    const apiName = 'WhiskPro';
    const path = `/api/object/User/${id}`;
    return API.get(apiName, path);
  };

  // ======================================
  //  User Authentication / Authorization
  // =======================================
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
    const filtered = user.chosenWhisks.filter((w) => w !== whiskId);
    user.chosenWhisks = filtered;
    const apiName = 'WhiskPro';
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
    const apiName = 'WhiskPro';
    const path = `/api`;
    const myInit = {
      body: userInfo,
    };
    await API.post(apiName, path, myInit);
    var updateUser = await getUserFromDB(userInfo.ID);
    dispatch({ type: CURRENT_USER, payload: updateUser });
  };

  //=======================
  //  Get Matches
  //=======================

  const saveMatchDataToContext = async (user) => {
    //query db for match info using each matchId in matches array
    let matchInfo = [];

    user.matches.map(async (matchId) => {
      function getData() {
        const apiName = 'WhiskPro';
        const path = `/api/object/Match/${matchId}`;
        const myInit = {
          headers: {},
        };
        return API.get(apiName, path, myInit);
      }

      try {
        const item = await getData();
        console.log('Get Match Obj>>>', item);
        matchInfo.push(item);
      } catch (e) {
        console.log('Error: ', e);
      }
    });

    console.log('MatchInfo Array', matchInfo);
    dispatch({
      type: GET_MATCHES,
      payload: matchInfo,
    });

    //for each match in context, query db for matched user info

    //for each match in context, query context for whisk info
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        getAuthenticatedUser,
        loginUser,
        logoutUser,
        getAllUsers,
        getUserFromDB,
        postUser,
        chooseWhisk,
        cancelChooseWhisk,
        updateProfile,
        setLoadingFalse,
        setLoadingTrue,
        createMatch,
        saveMatchDataToContext,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
