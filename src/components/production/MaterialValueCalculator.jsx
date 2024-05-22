/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
// Zewnętrzne importy
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Autocomplete, TextField, Tooltip, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Lottie from 'lottie-react';
import { useDispatch, useSelector } from 'react-redux';

// Lokalne importy
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';
import { MaterialDimensions } from './MaterialDimensions';
import { Input } from '../common/Input';
import { InputAdornment } from '@mui/material';
import { calculateMaterialValue } from './service/calculateMaterialValue';
import { materialTypeManager } from '../materialType/service/materialTypeManager';
import animation from '../../assets/Lottie/calculator.json';
import styles from './css/MaterialValueCalculator.module.css';
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setSelectMode } from '../../redux/actions/Action';
import { setProjectId } from '../../redux/actions/Action';
import { useParams } from 'react-router-dom';
import {
  setProductionItem,
  setMaterial,
  setMaterialType,
  setMaterialProfileRedux
} from '../../redux/actions/Action';

export const MaterialValueCalculator = ({ onClose, setMaterialValue, productionItem }) => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery(
    ['material_types'],
    materialTypeManager.getMaterialTypes
  );
  const selectedMaterial = useSelector((state) => state.material);
  const selectedMaterialTypeRedux = useSelector((state) => state.materialType);
  const selectedMaterialProfile = useSelector((state) => state.materialProfile);
  const [selectedMaterialType, setSelectedMaterialType] = useState(
    selectedMaterialTypeRedux ? selectedMaterialTypeRedux : null
  );
  const [materialProfile, setMaterialProfile] = useState(
    selectedMaterialProfile ? selectedMaterialProfile : 'Plate'
  );
  const [materialPricePerKg, setMaterialPricePerKg] = useState(
    selectedMaterial ? selectedMaterial.pricePerKg : 0
  );
  const [dimensions, setDimensions] = useState(
    selectedMaterial
      ? {
          width: selectedMaterial.x,
          height: selectedMaterial.y,
          thickness: selectedMaterial.z,
          outerDiameter: selectedMaterial.diameter,
          innerDiameter: selectedMaterial.diameter - 2 * selectedMaterial.thickness,
          length: selectedMaterial.length
        }
      : {}
  );

  const handleDimensionsChange = (updatedDimensions) => {
    setDimensions(updatedDimensions);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCalculateMaterialValue = () => {
    if (!selectedMaterialType) {
      alert('Select material type');
      return;
    }
    if (!materialProfile) {
      alert('Select material profile');
      return;
    }

    const materialValue = calculateMaterialValue(
      selectedMaterialType.density,
      materialPricePerKg,
      dimensions
    );

    setMaterialValue(materialValue);
    onClose();

    dispatch(setMaterial(undefined));
    dispatch(setMaterialType(undefined));
    dispatch(setProjectId(undefined));
    dispatch(setProductionItem(undefined));
    dispatch(setMaterialProfileRedux(undefined));
    dispatch(setSelectMode(false));
  };

  const handleSelectMaterial = () => {
    dispatch(setSelectMode(true));
    dispatch(setProjectId(id));
    dispatch(setProductionItem(productionItem));
    navigate('/materials/');
  };

  if (isLoading) return <Loader />;
  if (isError) return <Error message="Failed to fetch material types" />;

  return ReactDOM.createPortal(
    <div className={styles.modal_container}>
      <div className={styles.modal}>
        <Lottie animationData={animation} loop={true} className={styles.animation} />
        <div className={styles.modal_header}>
          <h2>Calculate material value</h2>
        </div>
        <div className={styles.choose_text_wrapper}>
          <Link className={styles.link} onClick={handleSelectMaterial}>
            Choose material from magazine
          </Link>
          <p className={styles.text}>or</p>
        </div>
        <Autocomplete
          fullWidth
          options={data}
          value={selectedMaterialType}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => `${option.name} - ${option.density} g/cm3`}
          onChange={(event, newValue) => {
            setSelectedMaterialType(newValue);
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
            <button className={styles.img_item} onClick={() => setMaterialProfile('Plate')}>
              <img src={require('../../assets/plate.png')} alt="Plate" />
            </button>
          </Tooltip>
          <Tooltip title="Tube" placement="top">
            <button className={styles.img_item} onClick={() => setMaterialProfile('Tube')}>
              <img src={require('../../assets/tube.png')} alt="Tube" />
            </button>
          </Tooltip>
          <Tooltip title="Rod" placement="top">
            <button className={styles.img_item} onClick={() => setMaterialProfile('Rod')}>
              <img src={require('../../assets/rod.png')} alt="Rod" />
            </button>
          </Tooltip>
        </div>
        <MaterialDimensions
          materialProfile={materialProfile}
          onDimensionsChange={handleDimensionsChange}
          material={selectedMaterial}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          onClick={handleCalculateMaterialValue}
        >
          Confirm
        </Button>
        <Button fullWidth variant="text" size="large" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>,
    document.getElementById('portal')
  );
};
