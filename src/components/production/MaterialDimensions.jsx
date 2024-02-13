import React from 'react';
import styles from './css/MaterialDimensions.module.css';
import { Input } from '../common/Input';
import { InputAdornment } from '@mui/material';
import { useState } from 'react';

export const MaterialDimensions = ({ materialProfile, onDimensionsChange }) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    thickness: 0,
    outerDiameter: 0,
    innerDiameter: 0,
    length: 0
  });

  const handleChange = (e, field) => {
    const newValue = e.target.value;
    const updatedDimensions = {
      ...dimensions,
      [field]: newValue
    };

    let relevantDimensions;
    if (materialProfile === 'plate') {
      relevantDimensions = {
        width: updatedDimensions.width,
        height: updatedDimensions.height,
        thickness: updatedDimensions.thickness
      };
    } else if (materialProfile === 'tube') {
      relevantDimensions = {
        outerDiameter: updatedDimensions.outerDiameter,
        innerDiameter: updatedDimensions.innerDiameter,
        length: updatedDimensions.length
      };
    } else if (materialProfile === 'rod') {
      relevantDimensions = {
        outerDiameter: updatedDimensions.outerDiameter,
        length: updatedDimensions.length
      };
    }

    setDimensions(updatedDimensions);
    onDimensionsChange(relevantDimensions);
  };

  if (!materialProfile) return null;

  if (materialProfile == 'plate') {
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
  }

  if (materialProfile == 'tube') {
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
  }

  if (materialProfile == 'rod') {
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
  }
};
