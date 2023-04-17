import React, { useState } from 'react';
import styles from './Header.module.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, Avatar } from '@mui/material';
import { Cart } from '../cart/Cart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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
        <Badge
          color="secondary"
          badgeContent={items}
          className={styles.icon}
          onClick={handleCartClick}
        >
          <ShoppingCartIcon />
        </Badge>
        {isCartOpen && <Cart onClose={handleCloseCart} />}
      </div>
      <Badge color="primary" badgeContent={notifications} className={styles.icon}>
        <NotificationsIcon />
      </Badge>
      <Avatar className={styles.icon}>{user}</Avatar>
    </div>
  );
};
