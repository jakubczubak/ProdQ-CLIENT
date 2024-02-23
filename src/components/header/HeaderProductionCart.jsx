//Importy zewnętrzne
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Badge, Tooltip } from '@mui/material';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';

//Importy lokalne
import { ProductionCart } from './../productionCart/ProductionCart';
import styles from './css/Header.module.css';

export const HeaderProductionCart = () => {
  const [isProductionCartOpen, setIsProductionCartOpen] = useState(false);
  const productionCartQuantity = useSelector((state) => state.productionBoxQuantity);

  const handleProductionCartClick = () => {
    setIsProductionCartOpen(!isProductionCartOpen);
  };

  const handleCloseProductionCart = () => {
    setIsProductionCartOpen(false);
  };

  return (
    <>
      <Tooltip title="Production summary">
        <Badge
          color="info"
          badgeContent={productionCartQuantity}
          className={styles.icon}
          onClick={handleProductionCartClick}>
          <SummarizeOutlinedIcon />
        </Badge>
      </Tooltip>
      {isProductionCartOpen && (
        <ProductionCart
          onClose={handleCloseProductionCart}
          productionCartQuantity={productionCartQuantity}
        />
      )}
    </>
  );
};
