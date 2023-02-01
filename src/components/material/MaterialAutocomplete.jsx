import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { Autocomplete } from '@mui/material';

const materials = [
  { name: 'Aluminum', density: 2.7 },
  { name: 'Titanium', density: 4.5 },
  { name: 'Stainless Steel', density: 7.93 },
  { name: 'Copper', density: 8.96 },
  { name: 'Carbon Steel', density: 7.85 },
  { name: 'Brass', density: 8.53 },
  { name: 'Bronze', density: 8.8 },
  { name: 'Nickel', density: 8.9 },
  { name: 'Aluminum Alloy', density: 2.7 },
  { name: 'Copper Alloy', density: 8.96 },
  { name: 'Polyethylene', density: 0.93 },
  { name: 'Polypropylene', density: 0.9 },
  { name: 'Acrylonitrile Butadiene Styrene (ABS)', density: 1.05 },
  { name: 'Polyacryl', density: 1.19 },
  { name: 'Polyamide (nylon)', density: 1.15 },
  { name: 'Ertacetal H', density: 1.41 },
  { name: 'Ertacetal C', density: 1.42 },
  { name: 'Ertacetal P', density: 1.45 },
  { name: 'Ertacetal HT', density: 1.42 }
];

const MaterialAutocomplete = () => {


  return (
    <Autocomplete
      options={materials}
      getOptionLabel={(option) => option.name + ' - ' + option.density + ' g/cm3'}
      onChange={(event, newValue) => {
        setSelectedMaterial(newValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Wybierz materiał" variant="outlined" />
      )}
    />
  );
};

export default MaterialAutocomplete;
