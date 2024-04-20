// Importy zewnętrzne
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { SpeedDial, SpeedDialIcon, Tooltip, TextField, InputAdornment } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

// Importy lokalne
import styles from './css/UserList.module.css';
import { User } from './User';
import { userManager } from './service/userManager';
import { UserModal } from './UserModal';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';

const speedDialStyles = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  zIndex: 1
};

export const UserList = () => {
  const [query, setQuery] = useState('');
  const [openUserModal, setOpenUserModal] = useState(false);

  const { data, isLoading, isError } = useQuery(['user'], userManager.getUserList); // fetch all users

  const filterUsers = (item) => {
    if (query === '') {
      return true; // Jeśli query jest puste, zwróć wszystkie elementy
    } else {
      const { firstName, lastName, email } = item;
      const lowerCaseQuery = query.toLowerCase();
      return (
        firstName.toLowerCase().includes(lowerCaseQuery) ||
        lastName.toLowerCase().includes(lowerCaseQuery) ||
        email.toLowerCase().includes(lowerCaseQuery)
      );
    }
  };

  return (
    <>
      <Tooltip title="Search" placement="right">
        <TextField
          variant="standard"
          onChange={(e) => setQuery(e.target.value)}
          label="Search"
          InputProps={{
            className: styles.search_input,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        ></TextField>
      </Tooltip>
      <div className={styles.user_list}>
        <Tooltip title="Add user" placement="right">
          <SpeedDial
            icon={<SpeedDialIcon openIcon={<EditIcon />} />}
            ariaLabel="Navigation speed dial"
            sx={speedDialStyles}
            onClick={() => setOpenUserModal(true)}
          ></SpeedDial>
        </Tooltip>
        {isLoading && <Loader />}
        {isError && <Error message={'Error fetch user list. Please try again later!'} />}
        {data && data.filter(filterUsers).map((user) => <User key={user.id} user={user} />)}
        <UserModal
          open={openUserModal}
          onClose={() => {
            setOpenUserModal(false);
          }}
        />
      </div>
    </>
  );
};
