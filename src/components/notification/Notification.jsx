import React from 'react';
import ReactDOM from 'react-dom';
import { useRef } from 'react';
import { useEffect } from 'react';
import styles from './css/Notification.module.css';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/notification.json';
import { IconButton, Tooltip, Button, Avatar } from '@mui/material';
import { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import icon from '../../assets/system.svg';
import { notificationManager } from './service/notificationManager';
import { useDispatch } from 'react-redux';
import { setNotificationQuantity } from '../../redux/actions/Action';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import MarkChatUnreadOutlinedIcon from '@mui/icons-material/MarkChatUnreadOutlined';
import MarkChatReadOutlinedIcon from '@mui/icons-material/MarkChatReadOutlined';
import { useQueryClient } from '@tanstack/react-query';

export const Notification = ({ onClose, data }) => {
  const cartRef = useRef(null);
  const [notifications, setNotifications] = useState(
    data.notifications.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
  );
  const [unreadNotifications] = useState(
    notifications.filter((notification) => notification.read == false)
  );
  const [readNotifications] = useState(
    notifications.filter((notification) => notification.read == true)
  );
  const [isRead, setIsRead] = useState(false);
  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  function getInitials(name) {
    const nameParts = name.split(' ');
    const initials = nameParts.map((part) => part.charAt(0)).join('');
    return initials;
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleClose = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      onClose();
    }
  };

  const handleDeleteNotification = (id) => {
    const newNotifications = notifications.filter((item) => item.id !== id);
    setNotifications(newNotifications);
    notificationManager.deleteNotification(id, queryClient, dispatch);
    dispatch(
      setNotificationQuantity(
        newNotifications.filter((notification) => notification.read == false).length
      )
    );
  };

  const handleDeleteReadNotifications = () => {
    const newNotifications = notifications.filter((item) => item.read !== true);
    setNotifications(newNotifications);
    readNotifications.forEach((item) => {
      notificationManager.deleteNotification(item.id, queryClient, dispatch);
    });
    dispatch(
      setNotificationQuantity(
        newNotifications.filter((notification) => notification.read == false).length
      )
    );
  };

  const handleDeleteUnreadNotifications = () => {
    const newNotifications = notifications.filter((item) => item.read !== false);
    setNotifications(newNotifications);
    unreadNotifications.forEach((item) => {
      notificationManager.deleteNotification(item.id, queryClient, dispatch);
    });
    dispatch(
      setNotificationQuantity(
        newNotifications.filter((notification) => notification.read == false).length
      )
    );
  };

  const handleMarkAsRead = (id) => {
    const newNotifications = notifications.map((item) => {
      if (item.id === id) {
        item.read = true;
      }
      return item;
    });
    setNotifications(newNotifications);
    notificationManager.updateNotification(id, queryClient, dispatch);
    dispatch(
      setNotificationQuantity(
        newNotifications.filter((notification) => notification.read == false).length
      )
    );
  };

  const handleMarkAsUnread = (id) => {
    const newNotifications = notifications.map((item) => {
      if (item.id === id) {
        item.read = false;
      }
      return item;
    });
    setNotifications(newNotifications);
    notificationManager.updateNotification(id, queryClient, dispatch);
    dispatch(
      setNotificationQuantity(
        newNotifications.filter((notification) => notification.read == false).length
      )
    );
  };

  return ReactDOM.createPortal(
    <div
      className={styles.modal_container}
      onClick={handleClose}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === 'Space') {
          handleClose();
        }
      }}
      tabIndex="0"
      role="button"
    >
      <div className={styles.notification} ref={cartRef}>
        <Lottie animationData={animation} loop={true} className={styles.animation} />
        <h2 className={styles.header}>
          Number of {isRead ? 'read' : 'unread'} notifications:{' '}
          {notifications.filter((notification) => notification.read == isRead).length}
        </h2>
        <div className={styles.line} />
        <div className={styles.list}>
          {notifications
            .filter((notification) => notification.read == isRead)
            .map((item, index) => (
              <div key={index} className={`${styles.list_item} ${item.read ? styles.read : ''}`}>
                <div className={styles.author_wrapper}>
                  <Tooltip title={item.author} placement="top">
                    {item.author === 'Infrabox' ? (
                      <Avatar
                        alt="Infrabox"
                        src={icon}
                        sx={{
                          width: 40,
                          height: 40
                        }}
                      />
                    ) : (
                      <Avatar>{getInitials(item.author)}</Avatar>
                    )}
                  </Tooltip>
                </div>
                <div className={styles.content_wrapper}>
                  <div className={styles.content_title}>
                    <span>{item.title}</span>
                  </div>
                  <div className={styles.content_text}>
                    <Tooltip title={item.description} placement="top-start">
                      <span>{item.description}</span>
                    </Tooltip>
                  </div>
                  <div className={styles.content_date}>
                    <span>{item.createdOn}</span>
                  </div>
                </div>
                <div className={styles.action_wrapper}>
                  {isRead ? (
                    <Tooltip title="Mark as unread" placement="top">
                      <IconButton
                        onClick={() => {
                          handleMarkAsUnread(item.id);
                        }}
                      >
                        <MarkChatUnreadOutlinedIcon
                          sx={{
                            height: 20,
                            width: 20
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Mark as read" placement="top">
                      <IconButton
                        onClick={() => {
                          handleMarkAsRead(item.id);
                        }}
                      >
                        <MarkChatReadOutlinedIcon
                          sx={{
                            height: 20,
                            width: 20
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  )}

                  <Tooltip title="Delete" placement="top">
                    <IconButton
                      onClick={() => {
                        handleDeleteNotification(item.id);
                      }}
                    >
                      <DeleteForeverIcon
                        sx={{
                          height: 20,
                          width: 20
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            ))}
        </div>
        <div className={styles.line} />
        <div className={styles.btn_wrapper}>
          {!isRead && (
            <Tooltip title="View all archived notifications" placement="top">
              <Button
                endIcon={<Inventory2OutlinedIcon />}
                size="small"
                onClick={() => setIsRead(true)}
              >
                <span className={styles.btn_text}>Archives</span>
              </Button>
            </Tooltip>
          )}

          {isRead && (
            <Tooltip title="Back to unread notifications" placement="top">
              <Button endIcon={<ReplyOutlinedIcon />} size="small" onClick={() => setIsRead(false)}>
                <span className={styles.btn_text}>Back</span>
              </Button>
            </Tooltip>
          )}
          {isRead && (
            <Tooltip title="Delete read notifications" placement="top">
              <Button
                endIcon={<ClearAllIcon />}
                size="small"
                onClick={handleDeleteReadNotifications}
              >
                <span className={styles.btn_text}>Clear</span>
              </Button>
            </Tooltip>
          )}
          {!isRead && (
            <Tooltip title="Delete unread notifications" placement="top">
              <Button
                endIcon={<ClearAllIcon />}
                size="small"
                onClick={handleDeleteUnreadNotifications}
              >
                <span className={styles.btn_text}>Clear</span>
              </Button>
            </Tooltip>
          )}
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};
