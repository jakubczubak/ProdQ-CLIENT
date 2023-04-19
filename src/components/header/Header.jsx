import React, { useState } from 'react';
import styles from './Header.module.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, Avatar, Tooltip } from '@mui/material';
import { Cart } from '../cart/Cart';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import { useSelector } from 'react-redux';

export const Header = () => {
  const [notifications] = useState(2);
  const [user] = useState('JC');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const boxQuantity = useSelector((state) => state.boxQuantity);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  return (
    <div className={styles.header_container}>
      <div className={styles.cart_container}>
        <Tooltip title="See the contents of the box">
          <Badge
            color="info"
            badgeContent={boxQuantity}
            className={styles.icon}
            onClick={handleCartClick}
          >
            <Inventory2Icon fontSize="small" />
          </Badge>
        </Tooltip>
        {isCartOpen && <Cart onClose={handleCloseCart} />}
      </div>
      <Tooltip title="See notifications">
        <Badge color="info" badgeContent={notifications} className={styles.icon}>
          <NotificationsIcon />
        </Badge>
      </Tooltip>
      <Avatar className={styles.icon}>{user}</Avatar>
    </div>
  );
};
