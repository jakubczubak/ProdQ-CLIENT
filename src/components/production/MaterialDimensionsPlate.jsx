// Zewnętrzne importy
import React from 'react';
import { InputAdornment } from '@mui/material';

// Lokalne importy
import { Input } from '../common/Input';
import styles from './css/MaterialDimensions.module.css';

export const MaterialDimensionsPlate = ({ dimensions, handleChange }) => {
  return (
    <div className={styles.material_dimensions}>
      <Input
        placeholder="415"
        value={dimensions.x}
        onChange={(e) => handleChange(e, 'x')}
        label="Width"
        InputProps={{
          endAdornment: <InputAdornment position="end">mm</InputAdornment>
        }}
      />
      <Input
        placeholder="575"
        value={dimensions.y}
        onChange={(e) => handleChange(e, 'y')}
        label="Height"
        InputProps={{
          endAdornment: <InputAdornment position="end">mm</InputAdornment>
        }}
      />
      <Input
        placeholder="10"
        value={dimensions.z}
        onChange={(e) => handleChange(e, 'z')}
        label="Thickness"
        InputProps={{
          endAdornment: <InputAdornment position="end">mm</InputAdornment>
        }}
      />
    </div>
  );
};
