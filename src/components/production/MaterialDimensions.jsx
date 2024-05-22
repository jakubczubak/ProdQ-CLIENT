// Zewnętrzne importy
import React from 'react';
import { useState } from 'react';

// Lokalne importy
import { MaterialDimensionsPlate } from './MaterialDimensionsPlate';
import { MaterialDimensionsTube } from './MaterialDimensionsTube';
import { MaterialDimensionsRod } from './MaterialDimensionsRod';

export const MaterialDimensions = ({ materialProfile, onDimensionsChange, material }) => {
  const [dimensions, setDimensions] = useState({
    width: material ? material.x : 0,
    height: material ? material.y : 0,
    thickness: material ? material.z : 0,
    outerDiameter: material ? material.diameter : 0,
    innerDiameter: material ? material.diameter - 2 * material.thickness : 0,
    length: material ? material.length : 0
  });

  const handleChange = (e, field) => {
    const newValue = e.target.value;
    const updatedDimensions = {
      ...dimensions,
      [field]: newValue
    };

    let relevantDimensions;
    if (materialProfile === 'Plate') {
      relevantDimensions = {
        width: updatedDimensions.width,
        height: updatedDimensions.height,
        thickness: updatedDimensions.thickness
      };
    } else if (materialProfile === 'Tube') {
      relevantDimensions = {
        outerDiameter: updatedDimensions.outerDiameter,
        innerDiameter: updatedDimensions.innerDiameter,
        length: updatedDimensions.length
      };
    } else if (materialProfile === 'Rod') {
      relevantDimensions = {
        outerDiameter: updatedDimensions.outerDiameter,
        length: updatedDimensions.length
      };
    }
    setDimensions(updatedDimensions);
    onDimensionsChange(relevantDimensions);
  };

  if (!materialProfile) return null;

  if (materialProfile == 'Plate') {
    return <MaterialDimensionsPlate dimensions={dimensions} handleChange={handleChange} />;
  }

  if (materialProfile == 'Tube') {
    return <MaterialDimensionsTube dimensions={dimensions} handleChange={handleChange} />;
  }

  if (materialProfile == 'Rod') {
    return <MaterialDimensionsRod dimensions={dimensions} handleChange={handleChange} />;
  }
};
