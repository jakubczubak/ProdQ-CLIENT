// Zewnętrzne importy
import React from 'react';
import { InputAdornment } from '@mui/material';
import { Input } from '../common/Input';

// Lokalny import
import styles from './css/MaterialDimensions.module.css';

export const MaterialDimensionsTube = ({ dimensions, handleChange }) => {
  return (
    <div className={styles.material_dimensions}>
      <Input
        placeholder="⌀ 100"
        value={dimensions.diameter}
        onChange={(e) => handleChange(e, 'diameter')}
        label="Outer Diameter"
        InputProps={{
          endAdornment: <InputAdornment position="end">mm</InputAdornment>
        }}
      />
      <Input
        placeholder="2"
        value={dimensions.thickness}
        onChange={(e) => handleChange(e, 'thickness')}
        label="Thickness"
        InputProps={{
          endAdornment: <InputAdornment position="end">mm</InputAdornment>
        }}
      />
      <Input
        placeholder="1000"
        value={dimensions.length}
        onChange={(e) => handleChange(e, 'length')}
        label="Length"
        InputProps={{
          endAdornment: <InputAdornment position="end">mm</InputAdornment>
        }}
      />
    </div>
  );
};
