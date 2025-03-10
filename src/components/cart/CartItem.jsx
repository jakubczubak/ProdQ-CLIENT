// Importy zewnętrzne
import React from 'react';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IconButton, Tooltip } from '@mui/material';
import { cartManager } from '../cart/service/cartManager';
import { useDispatch } from 'react-redux';

// Importy lokalne
import styles from './css/Cart.module.css';

export const CartItem = ({ index, item }) => {
  const dispatch = useDispatch();

  const handleDecrease = (item) => {
    cartManager.decreaseItem(item, dispatch);
  };

  const handleIncrease = (item) => {
    cartManager.increaseItem(item, dispatch);
  };

  const handleRemove = (item) => {
    cartManager.removeItem(item, dispatch);
  };

  return (
    <div key={index} className={styles.list_item}>
      <div>
        <Tooltip PopperProps={{ disablePortal: true }} title={item.name} placement="top">
          <span className={styles.item_name}>
            {index + 1}. {item.name}
          </span>
        </Tooltip>
      </div>

      <div>
        <span className={styles.item_quantity}>
          <Tooltip PopperProps={{ disablePortal: true }} title="Increase quantity" placement="top">
            <IconButton onClick={() => handleIncrease(item)}>
              <AddIcon color="action" />
            </IconButton>
          </Tooltip>
          {item.quantity.toFixed(2)}
          {item.item.diameter > 0 ? ' m.b.' : ' .szt'}
          <Tooltip PopperProps={{ disablePortal: true }} title="Decrease quantity" placement="top">
            <IconButton onClick={() => handleDecrease(item)}>
              <RemoveIcon color="action" />
            </IconButton>
          </Tooltip>
        </span>
        <Tooltip PopperProps={{ disablePortal: true }} title="Remove item" placement="top">
          <IconButton onClick={() => handleRemove(item)}>
            <DeleteOutlineOutlinedIcon color="action" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};
