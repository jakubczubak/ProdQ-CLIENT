import styles from './css/Material.module.css';
import ReactDom from 'react-dom';
import React from 'react';
import { Stack, Button, InputAdornment } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { plateValidationSchema } from './validationSchema/plateValidationSchema';
import { rodValidationSchema } from './validationSchema/rodValidationSchema';
import { tubeValidationSchema } from './validationSchema/tubeValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/edit.json';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from '../common/Input';
import { useState, useEffect } from 'react';
import { Dimensions } from './Dimensions';
import { materialManager } from './service/materialManager';
import { calculateVolume } from './service/calcualteVolume';
import { calculateWeight } from './service/calculateWeight';
import { calculatePrice } from './service/calculatePrice';
import { calcualteTotalPrice } from './service/calcualteTotalPrice';
import { useDispatch } from 'react-redux';

export const MaterialModal_EDIT = ({ onClose, item, materialListItem, updateTable }) => {
  const [weight, setWeight] = useState(0);
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const validationSchema = () => {
    if (item.type == 'Plate') {
      return plateValidationSchema;
    }
    if (item.type == 'Rod') {
      return rodValidationSchema;
    }
    if (item.type == 'Tube') {
      return tubeValidationSchema;
    }
  };

  const { handleSubmit, control, reset, watch } = useForm({
    defaultValues: {
      id: materialListItem.id,
      x: materialListItem.x,
      y: materialListItem.y,
      z: materialListItem.z,
      quantity: materialListItem.quantity,
      min_quantity: materialListItem.min_quantity,
      pricePerKg: materialListItem.pricePerKg,
      diameter: materialListItem.diameter,
      thickeness: materialListItem.thickeness,
      length: materialListItem.length,
      name: materialListItem.name,
      price: materialListItem.price,
      parent_id: materialListItem.parent_id,
      type: materialListItem.type,
      quantity_in_transit: materialListItem.quantity_in_transit
    },
    resolver: yupResolver(validationSchema())
  });

  useEffect(() => {
    const x = watch('x'); //width
    const y = watch('y'); //height
    const z = watch('z'); //thickness

    const diameter = watch('diameter'); //diameter
    const thickeness = watch('thickeness'); //thickeness
    const length = watch('length'); //length
    const quantity = watch('quantity'); //quantity
    const pricePerKg = watch('pricePerKg'); //price per kg

    const volume = calculateVolume(x, y, z, diameter, thickeness, length, item.type); //calculate volume
    const weight = calculateWeight(volume, item.material.density); //calculate weight
    const price = calculatePrice(weight, pricePerKg); //calculate price
    const totalPrice = calcualteTotalPrice(price, quantity); //calculate total price

    setWeight(weight); //set weight
    setPrice(price); //set price
    setTotalPrice(totalPrice); //set total price
  }, [watch()]); //watch for changes

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleForm = (data) => {
    if (item.type == 'Plate') {
      data.name = `${item.materialGroupName}: ${data.z}x${data.x}x${data.y}`;
    }
    if (item.type == 'Rod') {
      data.name = `${item.materialGroupName}: ⌀${data.diameter}x${data.length}`;
    }
    if (item.type == 'Tube') {
      data.name = `${item.materialGroupName}: ⌀${data.diameter}x${data.thickeness}x ${data.length}`;
    }
    data.price = price;
    item.materialList = item.materialList.map((item) => (item.id == data.id ? data : item)); //update materialList

    materialManager.updateMaterial(item, queryClient, dispatch); //update material in database
    updateTable(item.materialList); //update table
    onClose(); //close modal
    reset(); //reset form
  };

  return ReactDom.createPortal(
    <div className={styles.modal_container}>
      <div className={styles.modal}>
        <Lottie animationData={animation} loop={true} className={styles.modal_animation} />
        <div className={styles.modal_header}>
          <h2>Update position</h2>
        </div>
        <form onSubmit={handleSubmit(handleForm)}>
          <Dimensions control={control} type={item.type} />
          <Stack spacing={1} mt={2} className={styles.login_content} direction="row">
            <Controller
              name="quantity"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder="1"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Quantity"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">x</InputAdornment>
                  }}
                />
              )}
            />
            <Controller
              name="min_quantity"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder="1"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Min. quantity"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">x</InputAdornment>
                  }}
                />
              )}
            />
            <Controller
              name="pricePerKg"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder="42.5"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Price"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">PLN/kg</InputAdornment>
                  }}
                />
              )}
            />
          </Stack>
          <Stack spacing={1} mb={5} mt={5} className={styles.login_content} direction="row">
            <Input
              value={price}
              label="Price net (1x)"
              disabled
              variant="filled"
              InputProps={{
                endAdornment: <InputAdornment position="end">PLN</InputAdornment>
              }}
            />
            <Input
              value={weight}
              label="Weight"
              disabled
              variant="filled"
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>
              }}
            />
            <Input
              value={totalPrice}
              label="Total net"
              disabled
              variant="filled"
              InputProps={{
                endAdornment: <InputAdornment position="end">PLN</InputAdornment>
              }}
            />
          </Stack>
          <Button type="submit" variant="contained" size="large">
            Update
          </Button>
          <Button variant="text" size="large" onClick={onClose}>
            Cancel
          </Button>
        </form>
      </div>
    </div>,
    document.getElementById('portal')
  );
};
