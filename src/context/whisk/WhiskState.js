import React, { useReducer } from 'react';
import { GET_WHISK, SCAN_WHISKS } from '../types';
import WhiskContext from './whiskContext';
import WhiskReducer from './whiskReducer';

const WhiskState = (props) => {
  const initialState = {
    whisks: [],
    whisk: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(WhiskReducer, initialState);

  const scanWhisks = () => {
    // placeholder for API call
    dispatch({ type: SCAN_WHISKS });
  };

  const getWhisk = () => {
    // placeholder for API call
    dispatch({ type: GET_WHISK });
  };

  return (
    <WhiskContext.Provider
      value={{
        whisks: state.whisks,
        whisk: state.whisk,
        loading: state.loading,
        scanWhisks,
        getWhisk,
      }}
    >
      {props.children}
    </WhiskContext.Provider>
  );
};

export default WhiskState;
