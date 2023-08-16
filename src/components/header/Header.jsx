import React, { useState } from 'react';
import styles from './Header.module.css';
import { Badge, Avatar, Tooltip } from '@mui/material';
import { Cart } from '../cart/Cart';
import { Notification } from '../notification/Notification';
import { useSelector } from 'react-redux';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { userManager } from '../settings/service/userManager';
import { useQuery } from '@tanstack/react-query';

export const Header = () => {
  const userID = JSON.parse(localStorage.getItem('user')).id; //get logged user id
  const { data, isLoading, isError } = useQuery(['loggedUser'], () =>
    userManager.getUserById(userID)
  ); // fetch logged user

  const [notificationQuantity, setNotificationQuantity] = useState(2);
  const [user] = useState('JC');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const boxQuantity = useSelector((state) => state.boxQuantity);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleCloseNotification = () => {
    setIsNotificationOpen(false);
  };

  return (
    <div className={styles.header_container}>
      <div>
        <Tooltip title="Contents of the box">
          <Badge
            color="info"
            badgeContent={boxQuantity}
            className={styles.icon}
            onClick={handleCartClick}>
            <LocalMallOutlinedIcon />
          </Badge>
        </Tooltip>
        {isCartOpen && <Cart onClose={handleCloseCart} />}
      </div>
      <div>
        <Tooltip title="Notifications">
          <Badge
            color="info"
            badgeContent={notificationQuantity}
            className={styles.icon}
            onClick={handleNotificationClick}>
            <NotificationsNoneOutlinedIcon />
          </Badge>
        </Tooltip>
        {isNotificationOpen && <Notification onClose={handleCloseNotification} />}
      </div>

      <Avatar className={styles.icon}>{user}</Avatar>
    </div>
  );
};
