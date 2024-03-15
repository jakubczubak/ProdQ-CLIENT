// Importy zewnętrzne
import React, { useState } from 'react';
import { Avatar, FormControlLabel, FormGroup, Button } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
// Importy lokalne
import styles from './css/User.module.css';
import { userManager } from './service/userManager';
import { DeleteModal } from '../common/DeleteModal';
import { UserModal } from './UserModal';
import { IOSSwitch } from '../common/IOSSwitch';

export const User = ({ user }) => {
  const [isBlocked, setIsBlocked] = useState(user.blocked);
  const [role, setRole] = useState(user.role);
  const [initails] = useState(user.firstName.charAt(0) + user.lastName.charAt(0));
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleBlockUser = async () => {
    if (user.blocked) {
      if (await userManager.manageUser(user.id, 'unblock', queryClient, dispatch)) {
        setIsBlocked(false);
      }
    } else {
      if (await userManager.manageUser(user.id, 'block', queryClient, dispatch)) {
        setIsBlocked(true);
      }
    }
  };

  const handleRemoveUser = () => {
    userManager.deleteUser(user.id, queryClient, dispatch);
  };

  const handleAdminRights = async () => {
    if (user.role === 'ADMIN') {
      if (await userManager.manageUser(user.id, 'revokeAdmin', queryClient, dispatch)) {
        setRole('USER');
      }
    } else {
      if (await userManager.manageUser(user.id, 'grantAdmin', queryClient, dispatch)) {
        setRole('ADMIN');
      }
    }
  };

  return (
    <div className={styles.user_container}>
      <div className={styles.user_overview_logo}>
        <Avatar sx={{ width: 60, height: 60 }}>{initails}</Avatar>
      </div>
      <div className={styles.user_overview_details}>
        <p className={styles.user_overview_details_fullname}>
          {user.firstName + ' ' + user.lastName}
        </p>
        <p className={styles.user_overview_details_email}>
          <EmailOutlinedIcon />
          {user.email}
        </p>
        <FormGroup>
          <FormControlLabel
            control={
              <IOSSwitch sx={{ m: 1 }} checked={role == 'ADMIN' ? true : false} size="small" />
            }
            label="Admin"
            color="warning"
            onChange={handleAdminRights}
          />
          <FormControlLabel
            control={<IOSSwitch sx={{ m: 1 }} checked={isBlocked} size="small" />}
            label="Blocked"
            onChange={handleBlockUser}
          />
        </FormGroup>
        <div className={styles.btn_wrapper}>
          <Button variant="contained" onClick={() => setOpenUserModal(true)}>
            Edit
          </Button>
          <Button variant="outlined" color="error" onClick={() => setOpenDeleteModal(true)}>
            Delete
          </Button>
        </div>
      </div>
      <DeleteModal
        open={openDeleteModal}
        onCancel={() => setOpenDeleteModal(false)}
        onDelete={handleRemoveUser}
        name={user.firstName + ' ' + user.lastName}
        text="profile"
      />
      <UserModal open={openUserModal} onClose={() => setOpenUserModal(false)} user={user} />
    </div>
  );
};
