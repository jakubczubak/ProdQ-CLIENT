import React from 'react';
import styles from './css/User.module.css';
import { Avatar, FormControlLabel, FormGroup, IconButton, Switch, Tooltip } from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import EditIcon from '@mui/icons-material/Edit';
import { userManager } from './service/userManager';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../components/common/service/showNotification';
import { useState } from 'react';
import { DeleteModal } from '../common/DeleteModal';
import { UserModal } from './UserModal';

export const User = ({ user }) => {
  const [isBlocked, setIsBlocked] = useState(user.isBLocked);
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);
  const [initails] = useState(user.name.charAt(0) + user.surname.charAt(0));
  const [userFromLocalStorage] = useState(JSON.parse(localStorage.getItem('user')));
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleBlockUser = (event) => {
    if (user.id === userFromLocalStorage.id) {
      showNotification('You can not block yourself!', 'error', dispatch);
      return;
    }
    setIsBlocked(event.target.checked);

    user.isBLocked = !user.isBLocked;

    userManager.updateUser(user, queryClient, dispatch);
  };

  const handleRemoveUser = () => {
    if (user.id === userFromLocalStorage.id) {
      setOpenDeleteModal(false);
      showNotification('You can not delete yourself!', 'error', dispatch);
      return;
    }

    userManager.deleteUser(user.id, queryClient, dispatch);
  };

  const handleAdminRights = (event) => {
    if (user.id === userFromLocalStorage.id) {
      showNotification('You can not change your admin rights!', 'error', dispatch);
      return;
    }
    setIsAdmin(event.target.checked);

    user.isAdmin = !user.isAdmin;

    userManager.updateUser(user, queryClient, dispatch);
  };

  return (
    <div className={styles.user_container}>
      <div className={styles.user_overview_logo}>
        <Avatar sx={{ width: 60, height: 60 }}>{initails}</Avatar>
      </div>
      <div className={styles.user_overview_details}>
        <p className={styles.user_overview_details_fullname}>{user.name + ' ' + user.surname}</p>
        <p className={styles.user_overview_details_email}>{user.email}</p>
        <p className={styles.user_overview_details_phone}>{user.phone}</p>
        <FormGroup>
          <FormControlLabel
            control={<Switch color="primary" checked={isAdmin} />}
            label="Admin rights"
            color="warning"
            className={styles.user_overview_details_phone}
            onChange={handleAdminRights}
          />
          <FormControlLabel
            control={<Switch color="primary" checked={isBlocked} />}
            label="Block user"
            className={styles.user_overview_details_phone}
            onChange={handleBlockUser}
          />
        </FormGroup>
        <div>
          <Tooltip title="Edit user">
            <IconButton onClick={() => setOpenUserModal(true)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Remove user">
            <IconButton onClick={() => setOpenDeleteModal(true)}>
              <PersonRemoveIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <DeleteModal
        open={openDeleteModal}
        onCancel={() => setOpenDeleteModal(false)}
        onDelete={handleRemoveUser}
        name={user.name + ' ' + user.surname}
        text="profile"
      />
      <UserModal open={openUserModal} onClose={() => setOpenUserModal(false)} user={user} />
    </div>
  );
};
