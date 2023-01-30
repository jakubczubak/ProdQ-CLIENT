import { SET_OPEN, SET_CLOSE, SET_MSG, SET_SEVERITY } from '../actionTypes/actionTypes';

const initialState = {
  open: false,
  msg: '',
  severity: 'success'
};

export const materialReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_OPEN:
      return {
        ...state,
        open: true
      };

    case SET_CLOSE:
      return {
        ...state,
        open: false
      };

    case SET_MSG:
      return {
        ...state,
        msg: action.payload.msg
      };

    case SET_SEVERITY:
      return {
        ...state,
        severity: action.payload.severity
      };

    default:
      return state;
  }
};
