//Importy zewnętrzne
import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import React from 'react';
// Importy lokalne
import styles from './css/OrderItem.module.css';

export const ItemList = ({ cartItems, handleIncrease, handleDecrease, handleRemove }) => {
  // Funkcja określająca jednostkę na podstawie pól x, y, z, diameter, length, thickness
  const getUnit = (item) => {
    const { x = 0, y = 0, z = 0, diameter = 0, length = 0, thickness = 0 } = item.item || {};

    // Płyta: jeśli x, y, z > 0 (i brak diameter lub thickness)
    if (x > 0 && y > 0 && z > 0 && diameter === 0 && thickness === 0) {
      return ' szt.';
    }
    // Rura: jeśli diameter > 0, length > 0 i thickness > 0
    else if (diameter > 0 && length > 0 && thickness > 0) {
      return ' mb';
    }
    // Pręt: jeśli diameter > 0 i length > 0 (ale brak thickness)
    else if (diameter > 0 && length > 0 && thickness === 0) {
      return ' mb';
    }
    return ''; // Brak jednostki, jeśli nie pasuje do powyższych
  };

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
                {item.quantity.toFixed(2)}
                {getUnit(item)}
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
