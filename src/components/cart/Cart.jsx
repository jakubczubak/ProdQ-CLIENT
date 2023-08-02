/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './css/Cart.module.css';
import { useEffect } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton, Tooltip } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { cartManager } from '../cart/service/cartManager';
import { useSelector, useDispatch } from 'react-redux';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/box_v2.json';
import { Button } from '@mui/material';

export const Cart = ({ onClose }) => {
  const [items, setItems] = useState(cartManager.getItems());
  const boxQuantity = useSelector((state) => state.boxQuantity);

  const cartRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDecrease = (item) => {
    cartManager.decreaseItem(item, dispatch);
    setItems(cartManager.getItems());
  };

  const handleIncrease = (item) => {
    cartManager.increaseItem(item, dispatch);
    setItems(cartManager.getItems());
  };

  const handleRemove = (item) => {
    cartManager.removeItem(item, dispatch);
    setItems(cartManager.getItems());
  };
  const handleCreateOrder = () => {
    navigate('/order/new');
    onClose();
  };

  const handleClearAll = () => {
    cartManager.clearAll(dispatch);
    setItems(cartManager.getItems());
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
        <Lottie animationData={animation} loop={true} className={styles.animation} />

        <h2 className={styles.header}>Number of items: {boxQuantity}</h2>
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
                  <IconButton onClick={() => handleIncrease(item)}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
                ({item.quantity})
                <Tooltip title="Decrease quantity" placement="top">
                  <IconButton onClick={() => handleDecrease(item)}>
                    <RemoveIcon />
                  </IconButton>
                </Tooltip>
              </span>
              <Tooltip title="Remove item" placement="top">
                <IconButton onClick={() => handleRemove(item)}>
                  <DeleteForeverIcon />
                </IconButton>
              </Tooltip>
            </div>
          ))}
        </div>
        <div className={styles.line} />

        <div className={styles.btn_wrapper}>
          <Button endIcon={<AddShoppingCartIcon />} onClick={handleCreateOrder}>
            <span className={styles.btn_text}>New order</span>
          </Button>

          <Button endIcon={<ClearAllIcon />} onClick={handleClearAll}>
            <span className={styles.btn_text}>Clear all</span>
          </Button>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};
