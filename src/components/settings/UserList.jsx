import React from 'react';
import styles from './css/UserList.module.css';
import { User } from './User';
import { userManager } from './service/userManager';
import { useQuery } from '@tanstack/react-query';

export const UserList = () => {
  const { data, isLoading, isError } = useQuery(['users'], userManager.getUserList); // fetch all users

  return (
    <div className={styles.user_list}>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {data && data.map((user) => <User key={user.id} user={user} />)}
    </div>
  );
};
