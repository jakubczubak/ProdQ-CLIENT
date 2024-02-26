//Importy zewnętrzne
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Badge, Tooltip } from '@mui/material';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
//Importy lokalne
import { Cart } from '../cart/Cart';
import styles from './css/Header.module.css';

export const HeaderBoxCart = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const boxQuantity = useSelector((state) => state.boxQuantity);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <Tooltip title="Contents of the box">
        <Badge
          color="info"
          badgeContent={boxQuantity ? boxQuantity.toFixed(2) : boxQuantity}
          className={styles.icon}
          onClick={handleCartClick}
        >
          <LocalMallOutlinedIcon />
        </Badge>
      </Tooltip>
      {isCartOpen && <Cart onClose={handleCloseCart} boxQuantity={boxQuantity} />}
    </>
  );
};
