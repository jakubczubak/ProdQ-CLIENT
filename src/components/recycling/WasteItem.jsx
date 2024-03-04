// Importy zewnętrzne
import React from 'react';
import { Tooltip, IconButton } from '@mui/material';
import 'dayjs/locale/pl';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

// Importy lokalne
import styles from './css/RecycleItem.module.css';

export const WasteItem = ({ index, item, recyclingItems, setRecyclingItems }) => {
  return (
    <div className={styles.waste_item}>
      <Tooltip title="Waste name">
        <p className={styles.waste_name}>{item.name}</p>
      </Tooltip>
      <Tooltip title="Quantity">
        <p className={styles.waste_quantity}>{item.quantity} kg</p>
      </Tooltip>
      <Tooltip title="Price per kg">
        <p className={styles.waste_price}>{item.pricePerKg} PLN(net)/kg</p>
      </Tooltip>
      <Tooltip title="Value">
        <p className={styles.waste_value}>{item.totalPrice} PLN(net)</p>
      </Tooltip>
      <IconButton
        aria-label="delete"
        onClick={() => {
          const list = recyclingItems.filter((_, i) => i !== index);
          setRecyclingItems(list);
        }}
      >
        <Tooltip title="Delete">
          <DeleteOutlineOutlinedIcon color="success" />
        </Tooltip>
      </IconButton>
    </div>
  );
};
