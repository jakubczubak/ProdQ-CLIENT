//Importy zewnętrzne
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Tooltip } from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Avatar from '@mui/material/Avatar';
import { useQuery } from '@tanstack/react-query';
import { Box } from '@mui/material';

//Importy lokalne
import { NotificationComponent } from '../notification/NotificationComponent';
import { setNotificationQuantity } from '../../redux/actions/Action';
import { userManager } from '../settings/service/userManager';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';
import styles from './css/Header.module.css';

export const HeaderNotificationCart = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationQuantity = useSelector((state) => state.notificationQuantity);
  const { data, isLoading, isError, refetch } = useQuery(
    ['userData'],
    () => userManager.getUserData(),
    {
      refetchInterval: isNotificationOpen ? 30000 : false // Odświeżanie co 30s tylko gdy otwarte
    }
  );

  const dispatch = useDispatch();

  const handleNotificationClick = () => {
    setIsNotificationOpen((prev) => !prev);
    if (!isNotificationOpen) {
      refetch(); // Pobierz nowe powiadomienia przy otwieraniu
    }
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
        <Tooltip title="Check your notifications" placement="left" arrow>
          <Badge
            color="info"
            badgeContent={
              notificationQuantity == -1
                ? data.notifications.filter((notification) => notification.isRead == false).length
                : notificationQuantity
            }
            className={styles.icon}
            onClick={handleNotificationClick}>
            <Box
              sx={{
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f4f8fb' /* Tło */,
                borderRadius: '50%' /* Okrąg */,
                padding: '10px' /* Odstęp od ikony */,
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)' /* Cień */
              }}>
              <NotificationsNoneOutlinedIcon color="action" />
            </Box>
          </Badge>
        </Tooltip>
        <Tooltip title="Logged in as: " placement="left" arrow>
          <Avatar
            sx={{
              bgcolor: '#f4f8fb',
              borderRadius: '50%',
              padding: '10px',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
              color: '#707273'
            }}
            className={styles.icon}>
            {data.firstName[0] + data.lastName[0]}
          </Avatar>
        </Tooltip>
        {isNotificationOpen && (
          <NotificationComponent onClose={handleCloseNotification} data={data} />
        )}
      </>
    );
  }
};
