import { setOpen, setMsg, setSeverity } from '../../../redux/actions/Action';

export const showNotification = (message, severity, dispatch) => {
  dispatch(setMsg(message));
  dispatch(setSeverity(severity));
  dispatch(setOpen());
};
