//Importy zewnętrzne
import React from 'react';
import ReactDOM from 'react-dom';
import { useRef, useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { useQueryClient } from '@tanstack/react-query';
//Importy lokalne
import styles from './css/NotificationComponent.module.css';
import animation from '../../assets/Lottie/notification.json';
import { notificationManager } from './service/notificationManager';
import { useDispatch } from 'react-redux';
import { setNotificationQuantity } from '../../redux/actions/Action';
import { Actions } from './Actions';
import { Header } from './Header';
import { NotificationItem } from './NotificationItem';

export const NotificationComponent = ({ onClose, data }) => {
  const cartRef = useRef(null);
  const [isRead, setIsRead] = useState(false);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [notifications, setNotifications] = useState(
    data.notifications.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
  );
 
  const [readNotifications] = useState(
    notifications.filter((notification) => notification.read == true)
  );
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
    notificationManager.deleteUnreadNotifications(queryClient, dispatch)
      .then(() => {
        // Po pomyślnym usunięciu na serwerze aktualizujemy lokalny stan
        const newNotifications = notifications.filter((item) => item.read !== false);
        setNotifications(newNotifications);
        dispatch(
          setNotificationQuantity(
            newNotifications.filter((notification) => notification.read === false).length
          )
        );
      })
      .catch(() => {
        // W przypadku błędu nie aktualizujemy stanu lokalnego
        // Powiadomienie o błędzie jest już wyświetlane w deleteUnreadNotifications
      });
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
        <Header isRead={isRead} notifications={notifications} />
        <div className={styles.line} />
        <div className={styles.list}>
          {notifications
            .filter((notification) => notification.read == isRead)
            .map((item, index) => (
              <NotificationItem
                key={index}
                item={item}
                isRead={isRead}
                handleMarkAsRead={handleMarkAsRead}
                handleMarkAsUnread={handleMarkAsUnread}
                handleDeleteNotification={handleDeleteNotification}
              />
            ))}
        </div>
        <div className={styles.line} />
        <Actions
          isRead={isRead}
          setIsRead={setIsRead}
          handleDeleteReadNotifications={handleDeleteReadNotifications}
          handleDeleteUnreadNotifications={handleDeleteUnreadNotifications}
        />
      </div>
    </div>,
    document.getElementById('portal')
  );
};
