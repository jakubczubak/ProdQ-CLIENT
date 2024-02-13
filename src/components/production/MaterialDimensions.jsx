import React from 'react';
import styles from './css/MaterialDimensions.module.css';
import { Input } from '../common/Input';
import { InputAdornment } from '@mui/material';
import { useState } from 'react';

export const MaterialDimensions = ({ materialProfile }) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [thickness, setThickness] = useState(0);
  const [outerDiameter, setOuterDiameter] = useState(0);
  const [innerDiameter, setInnerDiameter] = useState(0);
  const [length, setLength] = useState(0);

  if (!materialProfile) return null;

  if (materialProfile == 'plate') {
    return (
      <div className={styles.material_dimensions}>
        <Input
          placeholder="415"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          label="Width"
          InputProps={{
            endAdornment: <InputAdornment position="end">mm</InputAdornment>
          }}
        />

        <Input
          placeholder="575"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          label="Height"
          InputProps={{
            endAdornment: <InputAdornment position="end">mm</InputAdornment>
          }}
        />

        <Input
          placeholder="10"
          value={thickness}
          onChange={(e) => setThickness(e.target.value)}
          label="Thickness"
          InputProps={{
            endAdornment: <InputAdornment position="end">mm</InputAdornment>
          }}
        />
      </div>
    );
  }

  if (materialProfile == 'tube') {
    return (
      <div className={styles.material_dimensions}>
        <Input
          placeholder="⌀ 100"
          value={outerDiameter}
          onChange={(e) => setOuterDiameter(e.target.value)}
          label="Outer Diameter"
          InputProps={{
            endAdornment: <InputAdornment position="end">mm</InputAdornment>
          }}
        />

        <Input
          placeholder="⌀ 80"
          value={innerDiameter}
          onChange={(e) => setInnerDiameter(e.target.value)}
          label="Inner Diameter"
          InputProps={{
            endAdornment: <InputAdornment position="end">mm</InputAdornment>
          }}
        />

        <Input
          placeholder="1000"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          label="Length"
          InputProps={{
            endAdornment: <InputAdornment position="end">mm</InputAdornment>
          }}
        />
      </div>
    );
  }

  if (materialProfile == 'rod') {
    return (
      <div className={styles.material_dimensions}>
        <Input
          placeholder="⌀ 100"
          value={outerDiameter}
          onChange={(e) => setOuterDiameter(e.target.value)}
          label="Diameter"
          InputProps={{
            endAdornment: <InputAdornment position="end">mm</InputAdornment>
          }}
        />

        <Input
          placeholder="1000"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          label="Length"
          InputProps={{
            endAdornment: <InputAdornment position="end">mm</InputAdornment>
          }}
        />
      </div>
    );
  }
};
