//Importy zewnętrzne
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Badge, Tooltip } from '@mui/material';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
//Importy lokalne
import { Cart } from '../cart/Cart';
import styles from './css/Header.module.css';
import { Box } from '@mui/material';

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
      <Tooltip title="View the contents of the box" placement="left" arrow>
        <Badge
          color="info"
          badgeContent={boxQuantity ? boxQuantity.toFixed(2) : boxQuantity}
          className={styles.icon}
          onClick={handleCartClick}
        >
          <Box
            sx={{
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f4f8fb' /* Tło */,
              borderRadius: '50%' /* Okrąg */,
              padding: '10px' /* Odstęp od ikony */,
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)' /* Cień */
            }}
          >
            <LocalMallOutlinedIcon color="action" />
          </Box>
        </Badge>
      </Tooltip>
      {isCartOpen && <Cart onClose={handleCloseCart} boxQuantity={boxQuantity} />}
    </>
  );
};
