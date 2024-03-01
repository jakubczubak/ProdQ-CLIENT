//Importy zewnętrzne
import React from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton, Tooltip } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
//Importy lokalne
import styles from './css/ProductionCart.module.css';

export const CartItem = ({
  item,
  index,
  handleSavePDF,
  handleIncrease,
  handleDecrease,
  handleRemove
}) => {
  return (
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
          {item.filePDF && (
            <Tooltip title="View PDF file" placement="top">
              <IconButton onClick={() => handleSavePDF(item)}>
                <PictureAsPdfIcon />
              </IconButton>
            </Tooltip>
          )}
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
  );
};
