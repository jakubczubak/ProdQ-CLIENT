//Importy zewnętrzne
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Tooltip } from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Avatar from '@mui/material/Avatar';
import { useQuery } from '@tanstack/react-query';

//Importy lokalne
import { Notification } from '../notification/Notification';
import { setNotificationQuantity } from '../../redux/actions/Action';
import { userManager } from '../settings/service/userManager';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';
import styles from './css/Header.module.css';

export const HeaderNotificationCart = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationQuantity = useSelector((state) => state.notificationQuantity);
  const { data, isLoading, isError } = useQuery(['userData'], () => userManager.getUserData(), {
    refetchInterval: 10000 // Ustawienie interwału na 60000 milisekund (10 sekund)
  });

  const dispatch = useDispatch();

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleCloseNotification = () => {
    setIsNotificationOpen(false);
  };

  useEffect(() => {
    if (data) {
      dispatch(
        setNotificationQuantity(
          data.notifications.filter((notification) => notification.read == false).length
        )
      );
    }
  }, [data, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error message="Failed to fetch user data. Check conosole for more info." />;
  }

  if (data) {
    return (
      <>
        <Tooltip title="Notifications">
          <Badge
            color="info"
            badgeContent={
              notificationQuantity == -1
                ? data.notifications.filter((notification) => notification.isRead == false).length
                : notificationQuantity
            }
            className={styles.icon}
            onClick={handleNotificationClick}>
            <NotificationsNoneOutlinedIcon />
          </Badge>
        </Tooltip>
        <Tooltip title={data.firstName + ' ' + data.lastName}>
          <Avatar className={styles.icon}>{data.firstName[0] + data.lastName[0]}</Avatar>
        </Tooltip>
        {isNotificationOpen && <Notification onClose={handleCloseNotification} data={data} />}
      </>
    );
  }
};
