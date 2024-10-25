//Importy zewnętrzne
import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import React from 'react';
// Importy lokalne
import styles from './css/OrderItem.module.css';

export const ItemList = ({ cartItems, handleIncrease, handleDecrease, handleRemove }) => {
  return (
    <div className={styles.list}>
      {cartItems &&
        cartItems.map((item, index) => (
          <div key={index} className={styles.list_item}>
            <div>
              <Tooltip title={item.name} placement="top">
                <span className={styles.item_name}>
                  {index + 1}. {item.name}
                </span>
              </Tooltip>
            </div>
            <div className={styles.action_wrapper}>
              <span className={styles.item_quantity}>
                <Tooltip title="Increase quantity" placement="top">
                  <span>
                    <IconButton onClick={() => handleIncrease(item)}>
                      <AddIcon color="action" />
                    </IconButton>
                  </span>
                </Tooltip>
                {item.quantity.toFixed(1)}
                {item.item ? (item.item.diameter > 0 ? ' m' : ' x') : ''}
                {item.material ? (item.material.diameter > 0 ? ' m' : ' x') : ''}
                <Tooltip title="Decrease quantity" placement="top">
                  <span>
                    <IconButton onClick={() => handleDecrease(item)}>
                      <RemoveIcon color="action" />
                    </IconButton>
                  </span>
                </Tooltip>
              </span>

              <Tooltip title="Remove item" placement="top">
                <span>
                  <IconButton onClick={() => handleRemove(item)}>
                    <DeleteOutlineOutlinedIcon color="action" />
                  </IconButton>
                </span>
              </Tooltip>
            </div>
          </div>
        ))}
    </div>
  );
};
