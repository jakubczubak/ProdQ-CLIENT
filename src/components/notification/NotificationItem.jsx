//Importy zewnętrzne
import React from 'react';
import { IconButton, Tooltip, Avatar } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MarkChatUnreadOutlinedIcon from '@mui/icons-material/MarkChatUnreadOutlined';
import MarkChatReadOutlinedIcon from '@mui/icons-material/MarkChatReadOutlined';
//Importy lokalne
import styles from './css/NotificationComponent.module.css';
import icon from '../../assets/system.svg';

export const NotificationItem = ({
  item,
  isRead,
  handleMarkAsRead,
  handleMarkAsUnread,
  handleDeleteNotification
}) => {
  function getInitials(name) {
    const nameParts = name.split(' ');
    const initials = nameParts.map((part) => part.charAt(0)).join('');
    return initials;
  }

  return (
    <div className={`${styles.list_item} ${item.read ? styles.read : ''}`}>
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
              }}>
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
              }}>
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
            }}>
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
  );
};
