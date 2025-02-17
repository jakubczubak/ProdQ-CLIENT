// Importy zewnętrzne
import React from 'react';
import { IconButton, Tooltip, Avatar, Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MarkChatUnreadOutlinedIcon from '@mui/icons-material/MarkChatUnreadOutlined';
import MarkChatReadOutlinedIcon from '@mui/icons-material/MarkChatReadOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
// Importy lokalne
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
    return nameParts.map((part) => part.charAt(0)).join('');
  }

  function handleDownload(url) {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function renderDescription(description) {

    console.log(description);
    const urlPattern = /https?:\/\/[^\s]+/;
    const match = description.match(urlPattern);

    if (match) {
      const url = match[0];
      return (
        <Button variant="text" endIcon={<PictureAsPdfOutlinedIcon />} onClick={() => handleDownload(url)}>
          Download report
        </Button>
      );
    }
    return (
      <span>
          {description.split('\n').map((line, index) => (
              <span key={index}>{line}<br /></span>
          ))}
      </span>
  );
  }

  return (
    <div className={`${styles.list_item} ${item.read ? styles.read : ''}`}>
      <div className={styles.author_wrapper}>
        <Tooltip title={item.author} placement="top">
          {item.author === 'Infrabox' ? (
            <Avatar alt="Infrabox" src={icon} sx={{ width: 40, height: 40 }} />
          ) : (
            <Avatar sx={{ textTransform: 'uppercase' }}>{getInitials(item.author)}</Avatar>
          )}
        </Tooltip>
      </div>
      <div className={styles.content_wrapper}>
        <div className={styles.content_title}>
          <span>{item.title}</span>
        </div>
        <div className={styles.content_text}>
          <Tooltip title={item.description} placement="top-start">
            {renderDescription(item.description)}
          </Tooltip>
        </div>
        <div className={styles.content_date}>
          <span>{item.createdOn}</span>
        </div>
      </div>
      <div className={styles.action_wrapper}>
        {isRead ? (
          <Tooltip title="Mark as unread" placement="top">
            <IconButton onClick={() => handleMarkAsUnread(item.id)}>
              <MarkChatUnreadOutlinedIcon sx={{ height: 20, width: 20 }} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Mark as read" placement="top">
            <IconButton onClick={() => handleMarkAsRead(item.id)}>
              <MarkChatReadOutlinedIcon sx={{ height: 20, width: 20 }} />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title="Delete" placement="top">
          <IconButton onClick={() => handleDeleteNotification(item.id)}>
            <DeleteForeverIcon sx={{ height: 20, width: 20 }} />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};
