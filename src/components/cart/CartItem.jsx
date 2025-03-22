import React from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IconButton, Tooltip } from '@mui/material';
import { cartManager } from '../cart/service/cartManager';
import { useDispatch } from 'react-redux';
import styles from './css/Cart.module.css';

export const CartItem = ({ index, item }) => {
  const dispatch = useDispatch();

  const handleDecrease = () => cartManager.decreaseItem(item, dispatch);
  const handleIncrease = () => cartManager.increaseItem(item, dispatch);
  const handleRemove = () => cartManager.removeItem(item, dispatch);

  return (
    <div className={styles.list_item}>
      <div>
        <Tooltip title={item.name} placement="top">
          <span className={styles.item_name}>
            {index + 1}. {item.name}
          </span>
        </Tooltip>
      </div>
      <div className={styles.item_controls}>
        <span className={styles.item_quantity}>
          <Tooltip title="Increase quantity" placement="top">
            <IconButton onClick={handleIncrease} sx={{ '&:hover': { color: '#4a90e2' } }}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          {item.quantity.toFixed(2)}
          {item.item.diameter > 0 ? ' m.b.' : ' szt'}
          <Tooltip title="Decrease quantity" placement="top">
            <IconButton onClick={handleDecrease} sx={{ '&:hover': { color: '#4a90e2' } }}>
              <RemoveIcon />
            </IconButton>
          </Tooltip>
        </span>
        <Tooltip title="Remove item" placement="top">
          <IconButton onClick={handleRemove} sx={{ '&:hover': { color: '#d32f2f' } }}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};