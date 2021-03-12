import { GET_WHISK, SCAN_WHISKS, SET_LOADING } from '../types';

const WhiskReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SCAN_WHISKS:
      return {
        ...state,
        whisks: action.payload,
        loading: false,
      };
    case GET_WHISK:
      return {
        ...state,
        whisk: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default WhiskReducer;
