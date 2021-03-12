import React, { useReducer } from 'react';
import { SET_LOADING, GET_WHISK, SCAN_WHISKS } from '../types';
import WhiskContext from './whiskContext';
import WhiskReducer from './whiskReducer';
import axios from 'axios';

const WhiskState = (props) => {
  const initialState = {
    whisks: [],
    whisk: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(WhiskReducer, initialState);
  const BASE_URL = '/placeholder.com'; //placeholder, URL to be imported from .env

  //=======================
  //    Scan Whisks
  //=======================

  const scanWhisks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/whisks`);
      const items = JSON.parse(response.data.body);
      console.log('Whisks retrieved>>>', items);

      dispatch({
        type: SCAN_WHISKS,
        payload: items,
      });
    } catch (e) {
      console.log('Error: ', e);
    }
  };

  //=======================
  //  Get Whisk By Id
  //=======================

  const getWhisk = async (whiskId) => {
    try {
      const response = await axios.get(`${BASE_URL}/whisks/${whiskId}`);
      console.log('Whisk retrieved>>>', response.data);

      dispatch({
        type: GET_WHISK,
        payload: response.data,
      });
    } catch (e) {
      console.log('Error: ', e);
    }
  };

  //=======================
  //    Set Loading
  //=======================
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <WhiskContext.Provider
      value={{
        whisks: state.whisks,
        whisk: state.whisk,
        loading: state.loading,
        setLoading,
        scanWhisks,
        getWhisk,
      }}
    >
      {props.children}
    </WhiskContext.Provider>
  );
};

export default WhiskState;
