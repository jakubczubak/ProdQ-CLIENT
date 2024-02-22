//Importy zewnętrzne
import { Snackbar, Alert } from '@mui/material';
import ReactDom from 'react-dom';

export const Notifications = ({ open, onClose, severity, message, anchorOrigin }) => {
  return ReactDom.createPortal(
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={anchorOrigin ? anchorOrigin : { vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>,
    document.getElementById('notifications')
  );
};
