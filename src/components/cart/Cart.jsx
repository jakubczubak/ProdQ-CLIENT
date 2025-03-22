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
import styles from './css/Cart.module.css';
import { CartItem } from './CartItem';

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
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    cartManager.syncCartWithServer(dispatch);
    setBoxItems(cartManager.getItems());
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [dispatch, onClose]);

  const handleClose = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) onClose();
  };

  return ReactDOM.createPortal(
    <div
      className={styles.modal_container}
      onClick={handleClose}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === 'Space') handleClose();
      }}
      tabIndex="0"
      role="button"
    >
      <div className={styles.cart} ref={cartRef} sx={{ animation: 'fadeIn 0.5s ease-in-out' }}>
        <Lottie animationData={animation} loop={true} className={styles.animation} />
        <h2 className={styles.header}>Number of items: {Math.round(boxQuantity)}</h2>
        <div className={styles.line} />
        <div className={styles.list}>
          {boxItems.length === 0 ? (
            <p className={styles.empty_text}>Your cart is empty!</p>
          ) : (
            boxItems.map((item, index) => <CartItem key={index} index={index} item={item} />)
          )}
        </div>
        <div className={styles.line} />
        <div className={styles.btn_wrapper}>
          <Tooltip title="Create new order" placement="top">
            <Button
              endIcon={<LocalMallOutlinedIcon />}
              onClick={handleCreateOrder}
              size="small"
              sx={{
                background: 'linear-gradient(90deg, #4a90e2 0%, #63b3ed 100%)',
                padding: '4px 16px',
                color: '#fff',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                '&:hover': { background: 'linear-gradient(90deg, #357abd 0%, #4a90e2 100%)' },
              }}
            >
              <span className={styles.btn_text}>Create order</span>
            </Button>
          </Tooltip>
          <Tooltip title="Clear all items" placement="top">
            <Button
              endIcon={<ClearAllIcon />}
              onClick={handleClearAll}
              size="small"
             
            >
              <span className={styles.btn_text}>Clear</span>
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};