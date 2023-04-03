import React from 'react';
import styles from './css/User.module.css';
import { Avatar, FormControlLabel, FormGroup, IconButton, Switch, Tooltip } from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import EditIcon from '@mui/icons-material/Edit';
import { userManager } from './service/userManager';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../components/common/service/showNotification';

export const User = ({ user }) => {
  const initails = user.name[0] + user.surname[0];
  const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleBlockUser = () => {
    console.log('block user');
  };

  const handleRemoveUser = () => {
    if (user.id === userFromLocalStorage.id) {
      showNotification('You can not delete yourself!', 'error', dispatch);
      return;
    }
    userManager.deleteUser(user.id, queryClient, dispatch);
  };

  const handleEditUser = () => {
    console.log('edit user');
  };

  const handleAdminRights = () => {
    console.log('admin rights');
  };

  return (
    <div className={styles.user_container}>
      <div className={styles.user_overview_logo}>
        <Avatar sx={{ width: 56, height: 56 }}>{initails}</Avatar>
      </div>
      <div className={styles.user_overview_details}>
        <p className={styles.user_overview_details_fullname}>{user.name + ' ' + user.surname}</p>
        <p className={styles.user_overview_details_email}>{user.email}</p>
        <p className={styles.user_overview_details_phone}>{user.phone}</p>
        <FormGroup>
          <FormControlLabel
            control={<Switch color="warning" />}
            label="Administrator rights"
            color="warning"
            className={styles.user_overview_details_phone}
            onChange={handleAdminRights}
          />
          <FormControlLabel
            control={<Switch color="warning" />}
            label="Block user"
            className={styles.user_overview_details_phone}
            onChange={handleBlockUser}
          />
        </FormGroup>
        <div>
          <Tooltip title="Edit user">
            <IconButton onClick={handleEditUser}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Remove user">
            <IconButton onClick={handleRemoveUser}>
              <PersonRemoveIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
