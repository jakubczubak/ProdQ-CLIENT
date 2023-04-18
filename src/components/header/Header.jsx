import React, { useState } from 'react';
import styles from './Header.module.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, Avatar } from '@mui/material';
import { Cart } from '../cart/Cart';
import Inventory2Icon from '@mui/icons-material/Inventory2';

export const Header = () => {
  const [notifications] = useState(2);
  const [items] = useState(3);
  const [user] = useState('JC');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  return (
    <div className={styles.header_container}>
      <div className={styles.cart_container}>
        <Badge color="info" badgeContent={items} className={styles.icon} onClick={handleCartClick}>
          <Inventory2Icon fontSize="small" />
        </Badge>
        {isCartOpen && <Cart onClose={handleCloseCart} />}
      </div>
      <Badge color="info" badgeContent={notifications} className={styles.icon} >
        <NotificationsIcon />
      </Badge>
      <Avatar className={styles.icon}>{user}</Avatar>
    </div>
  );
};
