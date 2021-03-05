import { GET_WHISK, SCAN_WHISKS } from '../types';

const WhiskReducer = (state, action) => {
  switch (action.type) {
    case GET_WHISK:
      return {
        ...state,
        //placeholder
      };
    case SCAN_WHISKS:
      return {
        ...state,
        //placeholder
      };
    default:
      return state;
  }
};

export default WhiskReducer;
