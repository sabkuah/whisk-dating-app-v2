import React, { useReducer } from 'react';
import { SET_LOADING, GET_WHISK, SCAN_WHISKS } from '../types';
import WhiskContext from './whiskContext';
import WhiskReducer from './whiskReducer';
import Amplify, { API } from 'aws-amplify';

const WhiskState = (props) => {
  const initialState = {
    whisks: [],
    whisk: {},
    loading: false,
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
        console.log('SCAN WHISKS>>>', items);
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

  // const getWhisk = async (whiskId) => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/whisks/${whiskId}`);
  //     console.log('Whisk retrieved>>>', response.data);

  //     dispatch({
  //       type: GET_WHISK,
  //       payload: response.data,
  //     });
  //   } catch (e) {
  //     console.log('Error: ', e);
  //   }
  // };

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
        //getWhisk,
      }}
    >
      {props.children}
    </WhiskContext.Provider>
  );
};

export default WhiskState;
