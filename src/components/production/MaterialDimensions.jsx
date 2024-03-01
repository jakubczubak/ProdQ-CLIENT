// Zewnętrzne importy
import React from 'react';
import { useState } from 'react';

// Lokalne importy
import { MaterialDimensionsPlate } from './MaterialDimensionsPlate';
import { MaterialDimensionsTube } from './MaterialDimensionsTube';
import { MaterialDimensionsRod } from './MaterialDimensionsRod';

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
    return <MaterialDimensionsPlate dimensions={dimensions} handleChange={handleChange} />;
  }

  if (materialProfile == 'tube') {
    return <MaterialDimensionsTube dimensions={dimensions} handleChange={handleChange} />;
  }

  if (materialProfile == 'rod') {
    return <MaterialDimensionsRod dimensions={dimensions} handleChange={handleChange} />;
  }
};
