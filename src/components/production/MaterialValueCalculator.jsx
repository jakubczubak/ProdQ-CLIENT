/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */

// Zewnętrzne importy
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Autocomplete, TextField, Tooltip, Button, InputAdornment, Link } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Lottie from 'lottie-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// Lokalne importy
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';
import { MaterialDimensions } from './MaterialDimensions';
import { Input } from '../common/Input';
import { calculateMaterialValue } from './service/calculateMaterialValue';
import { materialTypeManager } from '../materialType/service/materialTypeManager';
import animation from '../../assets/Lottie/calculator.json';
import styles from './css/MaterialValueCalculator.module.css';
import {
  setSelectMode,
  setProjectId,
  setProductionItem,
  setMaterial,
  setMaterialType,
  setMaterialProfileRedux
} from '../../redux/actions/Action';

export const MaterialValueCalculator = ({
  onClose,
  setMaterialValue,
  productionItem,
  setProductionItemMaterial
}) => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery(
    ['material_types'],
    materialTypeManager.getMaterialTypes
  );
  const selectedMaterial = useSelector((state) => state.material);
  const selectedMaterialTypeRedux = useSelector((state) => state.materialType);
  const selectedMaterialProfile = useSelector((state) => state.materialProfile);

  const [selectedMaterialType, setSelectedMaterialType] = useState(null);
  const [materialProfile, setMaterialProfile] = useState('Plate');
  const [materialPricePerKg, setMaterialPricePerKg] = useState(0);
  const [dimensions, setDimensions] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedMaterialTypeRedux) {
      setSelectedMaterialType(selectedMaterialTypeRedux);
    }

    if (selectedMaterialProfile) {
      setMaterialProfile(selectedMaterialProfile);
    }

    if (selectedMaterial) {
      setMaterialPricePerKg(selectedMaterial.pricePerKg);
      setDimensions({
        x: selectedMaterial.x,
        y: selectedMaterial.y,
        z: selectedMaterial.z,
        diameter: selectedMaterial.diameter,
        thickness: selectedMaterial.thickness,
        length: selectedMaterial.length
      });
    }
  }, [selectedMaterial, selectedMaterialTypeRedux, selectedMaterialProfile]);

  const handleDimensionsChange = (updatedDimensions) => {
    setDimensions(updatedDimensions);
  };

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

    const productionItemMaterial = {
      materialTypeID: selectedMaterialType ? selectedMaterialType.id : undefined,
      pricePerKg: materialPricePerKg ? materialPricePerKg : 0,
      type: materialProfile,
      z: dimensions.z || 0,
      y: dimensions.y || 0,
      x: dimensions.x || 0,
      diameter: dimensions.diameter || 0,
      length: dimensions.length || 0,
      thickness: dimensions.thickness || 0
    };

    setProductionItemMaterial(productionItemMaterial);
    setMaterialValue(materialValue);
    onClose();
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
          onClick={handleCalculateMaterialValue}>
          Confirm
        </Button>
        <Button
          fullWidth
          variant="text"
          size="large"
          onClick={() => {
            dispatch(setMaterial(undefined));
            dispatch(setMaterialType(undefined));
            dispatch(setProjectId(undefined));
            dispatch(setProductionItem(undefined));
            dispatch(setMaterialProfileRedux(undefined));
            dispatch(setSelectMode(false));
            onClose();
          }}>
          Cancel
        </Button>
      </div>
    </div>,
    document.getElementById('portal')
  );
};
