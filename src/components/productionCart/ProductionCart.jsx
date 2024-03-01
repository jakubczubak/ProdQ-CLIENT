//Importy zewnętrzne
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import { useState, useEffect } from 'react';

//Importy lokalne
import styles from './css/ProductionCart.module.css';
import { productionCartManager } from './service/productionCartManager';
import animation from '../../assets/Lottie/pdf.json';
import { savePDF } from '../common/service/savePDF';
import { Header } from './Header';
import { CartItem } from './CartItem';
import { ActionButtons } from './ActionButtons';

export const ProductionCart = ({ onClose, productionCartQuantity }) => {
  const [boxItems, setBoxItems] = useState(productionCartManager.getItems());
  const cartRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      onClose();
    }
  };

  const handleDecrease = (item) => {
    productionCartManager.decreaseItem(item, dispatch);
    setBoxItems(productionCartManager.getItems());
  };

  const handleIncrease = (item) => {
    productionCartManager.increaseItem(item, dispatch);
    setBoxItems(productionCartManager.getItems());
  };

  const handleRemove = (item) => {
    productionCartManager.removeItem(item, dispatch);
    setBoxItems(productionCartManager.getItems());
  };
  const handleCreateOrder = () => {
    navigate('/order/new');
    onClose();
  };

  const handleClearAll = () => {
    productionCartManager.clearAll(dispatch);
    setBoxItems(productionCartManager.getItems());
  };

  const handleSavePDF = (item) => {
    savePDF(item);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    setBoxItems(productionCartManager.getItems());
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch, onClose]);

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
      role="button"
    >
      <div className={styles.cart} ref={cartRef}>
        <Lottie animationData={animation} loop={true} className={styles.animation} />
        <Header productionCartQuantity={productionCartQuantity} />
        <div className={styles.line} />
        <div className={styles.list}>
          {boxItems.map((item, index) => (
            <CartItem
              key={index}
              item={item}
              index={index}
              handleSavePDF={handleSavePDF}
              handleIncrease={handleIncrease}
              handleDecrease={handleDecrease}
              handleRemove={handleRemove}
            />
          ))}
        </div>
        <div className={styles.line} />
        <ActionButtons handleCreateOrder={handleCreateOrder} handleClearAll={handleClearAll} />
      </div>
    </div>,
    document.getElementById('portal')
  );
};
