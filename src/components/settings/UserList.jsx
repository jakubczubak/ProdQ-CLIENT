import React from 'react';
import styles from './css/UserList.module.css';
import { User } from './User';
import { userManager } from './service/userManager';
import { useQuery } from '@tanstack/react-query';
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Tooltip,
  TextField,
  InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { UserModal } from './UserModal';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';
import SearchIcon from '@mui/icons-material/Search';

export const UserList = () => {
  const [query, setQuery] = useState('');
  const [openUserModal, setOpenUserModal] = useState(false);

  const { data, isLoading, isError } = useQuery(['user'], userManager.getUserList); // fetch all users

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
          }}></TextField>
      </Tooltip>
      <div className={styles.user_list}>
        <SpeedDial
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
          ariaLabel="Navigation speed dial"
          sx={speedDialStyles}>
          <SpeedDialAction
            icon={<AddIcon />}
            tooltipTitle="User Form"
            onClick={() => setOpenUserModal(true)}
          />
        </SpeedDial>
        {isLoading && <Loader />}
        {isError && <Error message={'Error fetch user list. Please try again later!'} />}
        {data &&
          data
            .filter((item) => {
              if (query === '') {
                return item;
              } else if (
                item.name.toLowerCase().includes(query.toLowerCase()) ||
                item.surname.toLowerCase().includes(query.toLowerCase()) ||
                item.email.toLowerCase().includes(query.toLowerCase)
              ) {
                return item;
              }
            })
            .map((user) => <User key={user.id} user={user} />)}
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

const speedDialStyles = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  zIndex: 1
};
