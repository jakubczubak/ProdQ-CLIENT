import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Tooltip } from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Avatar from '@mui/material/Avatar';
import { useQuery } from '@tanstack/react-query';
import { Box } from '@mui/material';
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
    { refetchInterval: isNotificationOpen ? 30000 : false }
  );
  const dispatch = useDispatch();

  const handleNotificationClick = () => {
    setIsNotificationOpen((prev) => !prev);
    if (!isNotificationOpen) refetch();
  };
  const handleCloseNotification = () => setIsNotificationOpen(false);

  useEffect(() => {
    if (data) {
      dispatch(setNotificationQuantity(data.notifications.filter((n) => !n.read).length));
    }
  }, [data, dispatch]);

  if (isLoading) return <Loader />;
  if (isError) return <Error message="Failed to fetch user data. Check console for more info." />;

  if (data) {
    return (
      <>
        <Tooltip title="Check your notifications" placement="left" arrow>
          <Badge
            color="info"
            badgeContent={notificationQuantity === -1 ? data.notifications.filter((n) => !n.isRead).length : notificationQuantity}
            className={styles.icon}
            onClick={handleNotificationClick}
          >
            <Box
              sx={{
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 245, 245, 0.9) 100%)',
                backdropFilter: 'blur(8px)',
                borderRadius: '50%',
                padding: '10px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
                '&:hover': {
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                  transform: 'scale(1.1)',
                },
              }}
            >
              <NotificationsNoneOutlinedIcon sx={{ color: '#4a90e2' }} />
            </Box>
          </Badge>
        </Tooltip>
        <Tooltip title={`Logged in as: ${data.firstName} ${data.lastName}`} placement="left" arrow>
          <Avatar
            sx={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 245, 245, 0.9) 100%)',
              backdropFilter: 'blur(8px)',
              borderRadius: '50%',
              padding: '10px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              color: '#4a90e2',
              transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                transform: 'scale(1.1)',
              },
            }}
            className={styles.icon}
          >
            {data.firstName[0] + data.lastName[0]}
          </Avatar>
        </Tooltip>
        {isNotificationOpen && <NotificationComponent onClose={handleCloseNotification} data={data} />}
      </>
    );
  }
};