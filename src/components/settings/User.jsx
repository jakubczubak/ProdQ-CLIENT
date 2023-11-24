import React from 'react';
import styles from './css/User.module.css';
import { Avatar, FormControlLabel, FormGroup } from '@mui/material';
import { userManager } from './service/userManager';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { DeleteModal } from '../common/DeleteModal';
import { UserModal } from './UserModal';
import { Button } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

export const User = ({ user }) => {
  const [isBlocked, setIsBlocked] = useState(user.blocked);
  const [role, setRole] = useState(user.role);
  const [initails] = useState(user.firstName.charAt(0) + user.lastName.charAt(0));
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleBlockUser = () => {
    if (user.blocked) {
      userManager.manageUser(user.id, 'unblock', queryClient, dispatch);
      setIsBlocked(false);
    } else {
      userManager.manageUser(user.id, 'block', queryClient, dispatch);
      setIsBlocked(true);
    }
  };

  const handleRemoveUser = () => {
    userManager.deleteUser(user.id, queryClient, dispatch);
  };

  const handleAdminRights = () => {
    if (user.role === 'ADMIN') {
      userManager.manageUser(user.id, 'revokeAdmin', queryClient, dispatch);
      setRole('USER');
    } else {
      userManager.manageUser(user.id, 'grantAdmin', queryClient, dispatch);
      setRole('ADMIN');
    }
  };

  const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5
        }
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff'
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
      }
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500
      })
    }
  }));

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
