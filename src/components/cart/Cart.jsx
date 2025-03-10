// Importy zewnętrzne
import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Tooltip, Button } from '@mui/material';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { cartManager } from '../cart/service/cartManager';
import { useDispatch } from 'react-redux';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/box.json';

// Importy lokalne
import styles from './css/Cart.module.css';
import { CartItem } from './CartItem';

/* eslint-disable jsx-a11y/click-events-have-key-events */

export const Cart = ({ onClose, boxQuantity }) => {
  const [boxItems, setBoxItems] = useState(cartManager.getItems());
  const cartRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateOrder = () => {
    navigate('/order/new');
    onClose();
  };

  const handleClearAll = () => {
    cartManager.clearAll(dispatch);
    setBoxItems(cartManager.getItems());
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    cartManager.syncCartWithServer(dispatch);
    setBoxItems(cartManager.getItems());

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch, onClose]);

  const handleClose = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className={styles.modal_container}
      onClick={handleClose}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === 'Space') {
          handleClose();
        }
      }}
      tabIndex="0"
      role="button">
      <div className={styles.cart} ref={cartRef}>
        <Lottie animationData={animation} loop={true} className={styles.animation} />
        <h2 className={styles.header}>Number of items: {boxQuantity.toFixed(1)}</h2>
        <div className={styles.line} />
        <div className={styles.list}>
          {boxItems.map((item, index) => (
            <CartItem key={index} index={index} item={item} />
          ))}
        </div>
        <div className={styles.line} />
        <div className={styles.btn_wrapper}>
          <Tooltip PopperProps={{ disablePortal: true }} title="Create new order" placement="top">
            <Button endIcon={<LocalMallOutlinedIcon />} onClick={handleCreateOrder} size="small">
              <span className={styles.btn_text}>Create order</span>
            </Button>
          </Tooltip>
          <Tooltip PopperProps={{ disablePortal: true }} title="Clear all items" placement="top">
            <Button endIcon={<ClearAllIcon />} onClick={handleClearAll} size="small">
              <span className={styles.btn_text}>Clear</span>
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};
