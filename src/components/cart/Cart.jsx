/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './css/Cart.module.css';
import { useEffect } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button } from '@mui/material';

export const Cart = ({ onClose }) => {
  const [items, setItems] = useState([
    { id: 1, name: 'Product A', quantity: 1 },
    { id: 2, name: 'Product asdasdasdasdB', quantity: 2 }
  ]);

  const cartRef = useRef(null);

  const handleDecrease = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity - 1
        };
      }
      return item;
    });
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
        <h2 className={styles.header}>Cart</h2>
        <div className={styles.list}>
          {items.map((item) => (
            <div key={item.id}>
              <span>
                {item.id}. {item.name}{' '}
                <button onClick={() => handleDecrease(item.id)}>
                  <RemoveIcon />
                </button>
                ({item.quantity})
                <button onClick={() => handleIncrease(item.id)}>
                  <AddIcon />
                </button>
              </span>

              <button onClick={() => handleRemove(item.id)}>
                <DeleteForeverIcon />
              </button>
            </div>
          ))}
        </div>

        <div className={styles.btn}>
          <Button onClick={handleCheckout} variant="contained">
            Checkout
          </Button>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};
