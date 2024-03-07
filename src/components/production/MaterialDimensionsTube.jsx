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
        value={dimensions.outerDiameter}
        onChange={(e) => handleChange(e, 'outerDiameter')}
        label="Outer Diameter"
        InputProps={{
          endAdornment: <InputAdornment position="end">mm</InputAdornment>
        }}
      />
      <Input
        placeholder="⌀ 80"
        value={dimensions.innerDiameter}
        onChange={(e) => handleChange(e, 'innerDiameter')}
        label="Inner Diameter"
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
