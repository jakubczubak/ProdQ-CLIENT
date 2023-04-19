/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './css/Cart.module.css';
import { useEffect } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton, Tooltip } from '@mui/material';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { cartManager } from '../cart/service/cartManager';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const Cart = ({ onClose }) => {
  const [items, setItems] = useState(cartManager.getItems());
  const boxQuantity = useSelector((state) => state.boxQuantity);

  const cartRef = useRef(null);

  const dispatch = useDispatch();

  const handleRemove = (item) => {
    cartManager.decreaseItem(item, dispatch);
    setItems(cartManager.getItems());
  };

  const handleCheckout = () => {
    // handle checkout logic here
    console.log('Checkout clicked');
  };

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

  return ReactDOM.createPortal(
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/no-noninteractive-tabindex
    <div className={styles.modal_container} onClick={handleClose} tabIndex="0">
      <div className={styles.cart} ref={cartRef}>
        <h2 className={styles.header}>Box ({boxQuantity})</h2>
        <div className={styles.line} />
        <div className={styles.list}>
          {items.map((item, index) => (
            <div key={index} className={styles.list_item}>
              <Tooltip title={item.name} placement="top">
                <span className={styles.item_name}>
                  {index + 1}. {item.name}
                </span>
              </Tooltip>
              <span className={styles.item_quantity}>
                <Tooltip title="Increase quantity" placement="top">
                  <IconButton onClick={() => console.log('dodawanie')}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
                ({item.quantity})
                <Tooltip title="Decrease quantity" placement="top">
                  <IconButton onClick={() => handleRemove(item)}>
                    <RemoveIcon />
                  </IconButton>
                </Tooltip>
              </span>
              <Tooltip title="Remove item" placement="top">
                <IconButton onClick={() => handleRemove(item.id)}>
                  <DeleteForeverIcon />
                </IconButton>
              </Tooltip>
            </div>
          ))}
        </div>
        <div className={styles.line} />

        <div className={styles.btn_wrapper}>
          <Tooltip title="Create design calculations" placement="top">
            <IconButton color="primary" size="small" onClick={handleCheckout} disableRipple>
              <CalculateOutlinedIcon />
              <span className={styles.btn_text}>Design calculation</span>
            </IconButton>
          </Tooltip>
          <Tooltip title="Order the necessary materials and tools" placement="top">
            <IconButton color="primary" size="small" onClick={handleCheckout} disableRipple>
              <AddShoppingCartIcon />
              <span className={styles.btn_text}>Order</span>
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};
