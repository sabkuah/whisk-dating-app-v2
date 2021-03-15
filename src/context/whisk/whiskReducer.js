import { GET_WHISK, CLEAR_WHISKS, SCAN_WHISKS, SET_LOADING_TRUE, SET_LOADING_FALSE } from '../types';

const WhiskReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING_TRUE:
      return {
        ...state,
        loading: true,
      };
    case SET_LOADING_FALSE:
      return {
        ...state,
        loading: false,
      };
    case SCAN_WHISKS:
      return {
        ...state,
        whisks: action.payload,
        loading: false, //may need to reconfigure
      };
    case GET_WHISK:
      return {
        ...state,
        whisk: action.payload,
        //loading: false,
      };
  case CLEAR_WHISKS:
    return {
      ...state,
      whisks: null,
      loading: false,
    };
  default:
    return state;
  }
};

export default WhiskReducer;
