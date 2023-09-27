import {
  SET_OPEN,
  SET_CLOSE,
  SET_MSG,
  SET_SEVERITY,
  SET_BOX_QUANTITY,
  SET_NOTIFICATION_QUANTITY,
  SET_CURRENT_TASK
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

const setNotificationQuantity = (notificationQuantity) => {
  return {
    type: SET_NOTIFICATION_QUANTITY,
    payload: {
      notificationQuantity: notificationQuantity
    }
  };
};

const setCurrentTask = (currentTask) => {
  return {
    type: SET_CURRENT_TASK,
    payload: {
      currentTask: currentTask
    }
  };
};

export {
  setOpen,
  setClose,
  setMsg,
  setSeverity,
  setBoxQuantity,
  setNotificationQuantity,
  setCurrentTask
};
