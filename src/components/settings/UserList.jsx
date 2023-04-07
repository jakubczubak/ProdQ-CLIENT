import React from 'react';
import styles from './css/UserList.module.css';
import { User } from './User';
import { userManager } from './service/userManager';
import { useQuery } from '@tanstack/react-query';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { UserModal } from './UserModal';
import { Loader } from '../common/Loader';

export const UserList = () => {
  const { data, isLoading, isError } = useQuery(['users'], userManager.getUserList); // fetch all users

  const [openUserModal, setOpenUserModal] = useState(false);

  return (
    <div className={styles.user_list}>
      <SpeedDial
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        ariaLabel="Navigation speed dial"
        sx={speedDialStyles}
      >
        <SpeedDialAction
          icon={<AddIcon />}
          tooltipTitle="User Form"
          onClick={() => setOpenUserModal(true)}
        />
      </SpeedDial>
      {isLoading && <Loader />}
      {isError && <p>Error</p>}
      {data && data.map((user) => <User key={user.id} user={user} />)}
      <UserModal
        open={openUserModal}
        onClose={() => {
          setOpenUserModal(false);
        }}
      />
    </div>
  );
};

const speedDialStyles = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  zIndex: 1
};
