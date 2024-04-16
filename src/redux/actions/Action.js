import {
  SET_OPEN,
  SET_CLOSE,
  SET_MSG,
  SET_SEVERITY,
  SET_BOX_QUANTITY,
  SET_NOTIFICATION_QUANTITY,
  SET_PRODUCTION_BOX_QUANTITY,
  TOGGLE_SIDEBAR
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

const setProductionBoxQuantity = (productionBoxQuantity) => {
  return {
    type: SET_PRODUCTION_BOX_QUANTITY,
    payload: {
      productionBoxQuantity: productionBoxQuantity
    }
  };
};

const setNotificationQuantity = (notificationQuantity) => {
  return {
    type: SET_NOTIFICATION_QUANTITY,
    payload: {
      notificationQuantity: notificationQuantity
    }
  };
};

const toggleSidebar = () => {
  return {
    type: TOGGLE_SIDEBAR
  };
};

export {
  setOpen,
  setClose,
  setMsg,
  setSeverity,
  setBoxQuantity,
  setNotificationQuantity,
  setProductionBoxQuantity,
  toggleSidebar
};
