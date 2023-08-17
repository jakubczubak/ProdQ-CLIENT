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
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';
import { cartManager } from '../cart/service/cartManager';
import { useEffect } from 'react';

export const Header = () => {
  const [readMessages, setReadMessages] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const userID = JSON.parse(localStorage.getItem('user')).id; //get logged user id
  const { data, isLoading, isError } = useQuery(['loggedUser'], () =>
    userManager.getUserById(userID)
  ); // fetch logged user

  useEffect(() => {
    if (!isLoading && !isError && data) {
      const notifications = data.notification; // Załóż, że tablica z danymi wiadomości jest dostępna w data.notification

      const read = [];
      const unread = [];

      for (const notification of notifications) {
        if (notification.isRead) {
          read.push(notification); // Dodaj wiadomość do tablicy z odczytanymi wiadomościami
        } else {
          unread.push(notification); // Dodaj wiadomość do tablicy z nieodczytanymi wiadomościami
        }
      }

      setReadMessages(read);
      setUnreadMessages(unread);
    }
  }, [data, isLoading, isError]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const boxQuantity = useSelector((state) => state.boxQuantity);
  const notificationQuantity = useSelector((state) => state.notificationQuantity);
  const [boxItems, setBoxItems] = useState(cartManager.getItems());

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

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div className={styles.header_container}>
      <div>
        <Tooltip title="Contents of the box">
          <Badge
            color="info"
            badgeContent={boxQuantity}
            className={styles.icon}
            onClick={handleCartClick}
          >
            <LocalMallOutlinedIcon />
          </Badge>
        </Tooltip>
        {isCartOpen && (
          <Cart
            onClose={handleCloseCart}
            boxQuantity={boxQuantity}
            boxItems={boxItems}
            setBoxItems={setBoxItems}
          />
        )}
      </div>

      <div>
        <Tooltip title="Notifications">
          <Badge
            color="info"
            badgeContent={notificationQuantity == -1 ? unreadMessages.length : notificationQuantity}
            className={styles.icon}
            onClick={handleNotificationClick}
          >
            <NotificationsNoneOutlinedIcon />
          </Badge>
        </Tooltip>
        {isNotificationOpen && (
          <Notification
            onClose={handleCloseNotification}
            data={data}
            readMessages={readMessages}
            unreadMessages={unreadMessages}
          />
        )}
      </div>
      <Tooltip title={data.name + ' ' + data.surname}>
        <Avatar className={styles.icon}>{data.name[0] + data.surname[0]}</Avatar>
      </Tooltip>
    </div>
  );
};
