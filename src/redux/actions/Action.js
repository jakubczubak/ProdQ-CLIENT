import {
  SET_OPEN,
  SET_CLOSE,
  SET_MSG,
  SET_SEVERITY,
  SET_BOX_QUANTITY
} from '../actionTypes/actionTypes';

const setOpen = () => {
  return {
    type: SET_OPEN
  };
};

const setClose = () => {
  return {
    type: SET_CLOSE
  };
};

const setMsg = (msg) => {
  return {
    type: SET_MSG,
    payload: {
      msg: msg
    }
  };
};

const setSeverity = (severity) => {
  return {
    type: SET_SEVERITY,
    payload: {
      severity: severity
    }
  };
};

const setBoxQuantity = (boxQuantity) => {
  return {
    type: SET_BOX_QUANTITY,
    payload: {
      boxQuantity: boxQuantity
    }
  };
};

export { setOpen, setClose, setMsg, setSeverity, setBoxQuantity };
