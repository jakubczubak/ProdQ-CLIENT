// Zewnętrzne importy
import React from 'react';
import { useState } from 'react';

// Lokalne importy
import { MaterialDimensionsPlate } from './MaterialDimensionsPlate';
import { MaterialDimensionsTube } from './MaterialDimensionsTube';
import { MaterialDimensionsRod } from './MaterialDimensionsRod';

export const MaterialDimensions = ({ materialProfile, onDimensionsChange, material }) => {
  const [dimensions, setDimensions] = useState({
    x: material ? material.x : 0,
    y: material ? material.y : 0,
    z: material ? material.z : 0,
    diameter: material ? material.diameter : 0,
    thickness: material ? material.thickness : 0,
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
        x: updatedDimensions.x,
        y: updatedDimensions.y,
        z: updatedDimensions.z
      };
    } else if (materialProfile === 'Tube') {
      relevantDimensions = {
        diameter: updatedDimensions.diameter,
        thickness: updatedDimensions.thickness,
        length: updatedDimensions.length
      };
    } else if (materialProfile === 'Rod') {
      relevantDimensions = {
        diameter: updatedDimensions.diameter,
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
