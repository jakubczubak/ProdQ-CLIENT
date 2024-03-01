// Zewnętrzne importy
import React from 'react';
import { InputAdornment } from '@mui/material';

// Lokalne importy
import { Input } from '../common/Input';

import styles from './css/MaterialDimensions.module.css';

export const MaterialDimensionsRod = ({ dimensions, handleChange }) => {
  return (
    <div className={styles.material_dimensions}>
      <Input
        placeholder="⌀ 100"
        value={dimensions.outerDiameter}
        onChange={(e) => handleChange(e, 'outerDiameter')}
        label="Diameter"
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
