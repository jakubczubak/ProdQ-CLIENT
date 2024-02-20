import React from 'react';
import ReactDom from 'react-dom';
import styles from './css/MaterialValueCalcualtor.module.css';
import animation from '../../assets/Lottie/calculator.json';
import Lottie from 'lottie-react';
import { Autocomplete, TextField, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { materialTypeManager } from '../materialType/service/materialTypeManager';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';
import { Button } from '@mui/material';
import { MaterialDimensions } from './MaterialDimensions';
import { Input } from '../common/Input';
import { InputAdornment } from '@mui/material';
import { calculateMaterialValue } from './service/calculateMaterialValue';

export const MaterialValueCalcualtor = ({ onClose, setMaterialValue }) => {
  const { data, isLoading, isError } = useQuery(
    ['material_types'],
    materialTypeManager.getMaterialTypes
  ); // fetch all materials types

  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [materialProfile, setMaterialProfile] = useState('plate');
  const [materialPricePerKg, setMaterialPricePerKg] = useState(0);
  const [dimensions, setDimensions] = useState({});

  const handleDimensionsChange = (updatedDimensions) => {
    setDimensions(updatedDimensions);
  };

  const handleCalculateMaterialValue = () => {
    if (!selectedMaterial) {
      alert('Select material type');
      return;
    }
    if (!materialProfile) {
      alert('Select material profile');
      return;
    }

    const materialValue = calculateMaterialValue(
      selectedMaterial.density,
      materialPricePerKg,
      dimensions
    );

    setMaterialValue(materialValue);
    onClose();
  };

  if (isLoading) return <Loader />;
  if (isError) return <Error message="Faile to fetch material types" />;

  return ReactDom.createPortal(
    <>
      <div className={styles.modal_container}>
        <div className={styles.modal}>
          <Lottie animationData={animation} loop={true} className={styles.animation} />

          <div className={styles.modal_header}>
            <h2>Calculate material value</h2>
          </div>
          <Autocomplete
            fullWidth
            options={data}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.name + ' - ' + option.density + ' g/cm3'}
            onChange={(event, newValue) => {
              setSelectedMaterial(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Material type" variant="outlined" />
            )}
            sx={{ marginBottom: '20px' }}
          />
          <Input
            label="Price per kg"
            value={materialPricePerKg}
            onChange={(e) => setMaterialPricePerKg(e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">PLN/kg</InputAdornment>
            }}
          />

          <div className={styles.img_wrapper}>
            <Tooltip title="Plate" placement="top">
              <button
                className={styles.img_item}
                onClick={() => {
                  setMaterialProfile('plate');
                }}>
                <img src={require('../../assets/plate.png')} alt="Plate" />
              </button>
            </Tooltip>
            <Tooltip title="Tube" placement="top">
              <button
                className={styles.img_item}
                onClick={() => {
                  setMaterialProfile('tube');
                }}>
                <img src={require('../../assets/tube.png')} alt="Tube" />
              </button>
            </Tooltip>
            <Tooltip title="Rod" placement="top">
              <button
                className={styles.img_item}
                onClick={() => {
                  setMaterialProfile('rod');
                }}>
                <img src={require('../../assets/rod.png')} alt="Rod" />
              </button>
            </Tooltip>
          </div>

          <MaterialDimensions
            materialProfile={materialProfile}
            onDimensionsChange={handleDimensionsChange}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            onClick={handleCalculateMaterialValue}>
            Confirm
          </Button>
          <Button fullWidth variant="text" size="large" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
};
