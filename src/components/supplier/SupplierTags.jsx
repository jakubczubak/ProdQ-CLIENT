// Importy zewnętrzne
import React from 'react';
import { TextField, Tooltip } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

// Importy lokalne
import styles from './css/SupplierForm.module.css';

export const SupplierTags = ({ handleAddTag }) => {
  return (
    <div className={styles.tag_wrapper}>
      <TextField
        id="standard-basic"
        label="Identification mark"
        variant="outlined"
        color="primary"
        InputProps={{
          endAdornment: (
            <Tooltip title="Assign an identification mark">
              <SendOutlinedIcon
                sx={{ color: '#767676', cursor: 'pointer' }}
                onClick={handleAddTag}
              />
            </Tooltip>
          )
        }}
      />
    </div>
  );
};
