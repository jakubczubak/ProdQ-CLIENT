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
        value={dimensions.width}
        onChange={(e) => handleChange(e, 'width')}
        label="Width"
        InputProps={{
          endAdornment: <InputAdornment position="end">mm</InputAdornment>
        }}
      />
      <Input
        placeholder="575"
        value={dimensions.height}
        onChange={(e) => handleChange(e, 'height')}
        label="Height"
        InputProps={{
          endAdornment: <InputAdornment position="end">mm</InputAdornment>
        }}
      />
      <Input
        placeholder="10"
        value={dimensions.thickness}
        onChange={(e) => handleChange(e, 'thickness')}
        label="Thickness"
        InputProps={{
          endAdornment: <InputAdornment position="end">mm</InputAdornment>
        }}
      />
    </div>
  );
};
