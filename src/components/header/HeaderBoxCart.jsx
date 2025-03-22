import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Badge, Tooltip } from '@mui/material';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { Cart } from '../cart/Cart';
import styles from './css/Header.module.css';
import { Box } from '@mui/material';

export const HeaderBoxCart = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const boxQuantity = useSelector((state) => state.boxQuantity);

  const handleCartClick = () => setIsCartOpen(!isCartOpen);
  const handleCloseCart = () => setIsCartOpen(false);

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
            <LocalMallOutlinedIcon sx={{ color: '#4a90e2' }} />
          </Box>
        </Badge>
      </Tooltip>
      {isCartOpen && <Cart onClose={handleCloseCart} boxQuantity={boxQuantity} />}
    </>
  );
};