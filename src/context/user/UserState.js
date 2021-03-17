import React, { useReducer } from 'react';
import {
  CURRENT_USER,
  LOGIN_USER,
  LOGOUT_USER,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
} from '../types';
import UserReducer from './userReducer';
import UserContext from './userContext';
import { Auth, API } from 'aws-amplify';
import { v4 as uuid } from 'uuid';

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

  const getAllUsers = (myInit) => {
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
  //push whisk to user's chosenWhisks array
  //send updated user object to DB
  //ensure user state is up to date
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
  //  Create New Match
  //=======================

  const FemaleUsers = [
    '52bb9ed8-2297-4996-89db-01383c09e51f',
    '59490f6f-5eba-405a-a4e1-770efb15794a',
  ];

  const MaleUsers = [
    '5dd02c42-3024-4c57-bf3a-e1cdd239502c',
    '5eb24c36-6192-4108-bdff-cf7c1d376526',
  ];

  const createMatch = async (user, whiskId) => {
    //Assemble possible matches
    let possibleMatches = [];
    switch (user.preference) {
      case 'females':
        possibleMatches = FemaleUsers;
        break;
      case 'males':
        possibleMatches = MaleUsers;
        break;
      case 'other':
        possibleMatches = FemaleUsers;
        possibleMatches.push(...MaleUsers);
        break;
      default:
        possibleMatches = FemaleUsers;
        possibleMatches.push(...MaleUsers);
        break;
    }

    //Pick a random person
    console.log('Your possible matches are: ', possibleMatches);
    const randomIndex = Math.floor(Math.random() * possibleMatches.length);
    const matchId = possibleMatches[randomIndex];
    possibleMatches = []; //reset

    console.log('Congrats, your match is: ', matchId);

    //Create match object
    const newMatch = {
      ID: uuid(),
      isConfirmed: true,
      status: 'pending',
      Type: 'Match',
      userIds: [user.ID, matchId],
      whiskId: whiskId,
    };

    console.log('A match made in heaven!!', newMatch);
  };

  //=======================
  //  Populate all Matches
  //=======================

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
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
