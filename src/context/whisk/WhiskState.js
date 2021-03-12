import React, { useReducer } from 'react';
import {
  GET_WHISK,
  SCAN_WHISKS,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
} from '../types';
import WhiskContext from './whiskContext';
import WhiskReducer from './whiskReducer';
import Amplify, { API } from 'aws-amplify';

const WhiskState = (props) => {
  const initialState = {
    whisks: [],
    //whisk: {},
    loading: true,
  };

  const [state, dispatch] = useReducer(WhiskReducer, initialState);

  //=======================
  //    Scan Whisks
  // /api/Whisks
  //=======================

  const scanWhisks = async () => {
    function getData() {
      const apiName = 'WhiskPro';
      const path = '/api/Whisk';
      const myInit = {
        headers: {},
      };
      return API.get(apiName, path, myInit);
    }

    try {
      (async function () {
        const items = await getData();
        console.log('DB SCAN>>>', items);
        dispatch({
          type: SCAN_WHISKS,
          payload: items,
        });
      })();
    } catch (e) {
      console.log('Error: ', e);
    }
  };

  //=======================
  //  Get Whisk By Id
  // /api/object/Whisk/id
  //=======================

  const getWhisk = async (id) => {
    function getData() {
      const apiName = 'WhiskPro';
      const path = `/api/object/Whisk/${id}`;
      const myInit = {
        headers: {},
      };
      return API.get(apiName, path, myInit);
    }

    try {
      const item = await getData();
      console.log('DB GET>>>', item);
      return item;
    } catch (e) {
      console.log('Error: ', e);
    }
  };

  //=======================
  //    Set Loading
  //=======================
  const setLoadingTrue = () => dispatch({ type: SET_LOADING_TRUE });
  const setLoadingFalse = () => dispatch({ type: SET_LOADING_FALSE });

  return (
    <WhiskContext.Provider
      value={{
        whisks: state.whisks,
        //whisk: state.whisk,
        loading: state.loading,
        setLoadingTrue,
        setLoadingFalse,
        scanWhisks,
        getWhisk,
      }}
    >
      {props.children}
    </WhiskContext.Provider>
  );
};

export default WhiskState;
