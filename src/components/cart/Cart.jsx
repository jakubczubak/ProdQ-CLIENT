/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './css/Cart.module.css';
import { useEffect } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button, IconButton, Tooltip } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export const Cart = ({ onClose }) => {
  const [items, setItems] = useState([
    { id: 1, name: 'Product A', quantity: 1 },
    { id: 2, name: 'Product asdasdasdasdBasdasdasdasdasdasdasdasdasdasdasdasdasdasd', quantity: 2 },
    { id: 3, name: 'Product C', quantity: 3 },
    { id: 4, name: 'Product D', quantity: 4 },
    { id: 5, name: 'Product E', quantity: 5 },
    { id: 6, name: 'Product F', quantity: 6 },
    { id: 1, name: 'Product A', quantity: 1 },
    { id: 2, name: 'Product asdasdasdasdBasdasdasdasdasdasdasdasdasdasdasdasdasdasd', quantity: 2 },
    { id: 3, name: 'Product C', quantity: 3 },
    { id: 4, name: 'Product D', quantity: 4 },
    { id: 5, name: 'Product E', quantity: 5 },
    { id: 6, name: 'Product F', quantity: 6 }
  ]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const accumulateQuantity = () => {
    const totalQuantity = items.reduce((acc, curr) => acc + curr.quantity, 0);
    return totalQuantity;
  };

  useEffect(() => {
    setTotalQuantity(accumulateQuantity());
  }, [items]);

  const cartRef = useRef(null);

  const handleDecreaseAndRemoveIfZero = (id) => {
    const updatedItems = items
      .map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity - 1;
          if (newQuantity === 0) {
            return null;
          }
          return {
            ...item,
            quantity: newQuantity
          };
        }
        return item;
      })
      .filter((item) => item !== null);
    setItems(updatedItems);
  };

  const handleIncrease = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleRemove = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
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
        <h2 className={styles.header}>Box ({totalQuantity})</h2>
        <div className={styles.line} />
        <div className={styles.list}>
          {items.map((item) => (
            <div key={item.id} className={styles.list_item}>
              <Tooltip title={item.name} placement="top">
                <span className={styles.item_name}>
                  {item.id}. {item.name}
                </span>
              </Tooltip>
              <span className={styles.item_quantity}>
                <Tooltip title="Increase quantity" placement="top">
                  <IconButton onClick={() => handleIncrease(item.id)}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
                ({item.quantity})
                <Tooltip title="Decrease quantity" placement="top">
                  <IconButton onClick={() => handleDecreaseAndRemoveIfZero(item.id)}>
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
            <Button onClick={handleCheckout} variant="text">
              <IconButton color="primary" size="small">
                <CalculateIcon />
              </IconButton>
              Design calculation
            </Button>
          </Tooltip>
          <Tooltip title="Order the necessary materials and tools" placement="top">
            <Button onClick={handleCheckout} variant="text">
              <IconButton color="primary" size="small">
                <AddShoppingCartIcon />
              </IconButton>
              Order
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};
