import React, { useRef } from 'react';
import styles from './css/ProductionCart.module.css';
import ReactDOM from 'react-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton, Tooltip } from '@mui/material';
import { cartManager } from '../cart/service/cartManager';
import { useDispatch } from 'react-redux';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/pdf.json';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export const ProductionCart = ({ onClose, productionCartQuantity }) => {
  const [boxItems, setBoxItems] = useState([]);
  const cartRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      onClose();
    }
  };

  const handleDecrease = (item) => {
    cartManager.decreaseItem(item, dispatch);
    setBoxItems(cartManager.getItems());
  };

  const handleIncrease = (item) => {
    cartManager.increaseItem(item, dispatch);
    setBoxItems(cartManager.getItems());
  };

  const handleRemove = (item) => {
    cartManager.removeItem(item, dispatch);
    setBoxItems(cartManager.getItems());
  };
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

        <h2 className={styles.header}>Number of items: {productionCartQuantity}</h2>
        <div className={styles.line} />
        <div className={styles.list}>
          {boxItems.map((item, index) => (
            <div key={index} className={styles.list_item}>
              <div>
                <Tooltip title={item.name} placement="top">
                  <span className={styles.item_name}>
                    {index + 1}. {item.name}
                  </span>
                </Tooltip>
              </div>

              <div>
                <span className={styles.item_quantity}>
                  <Tooltip title="View PDF file" placement="top">
                    <IconButton onClick={console.log('view pdf file')}>
                      <PictureAsPdfIcon />
                    </IconButton>
                  </Tooltip>
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
            </div>
          ))}
        </div>
        <div className={styles.line} />

        <div className={styles.btn_wrapper}>
          <Tooltip title="Create production summary" placement="top">
            <Button endIcon={<SummarizeOutlinedIcon />} onClick={handleCreateOrder} size="small">
              <span className={styles.btn_text}>Production summary</span>
            </Button>
          </Tooltip>
          <Tooltip title="Clear all items" placement="top">
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
