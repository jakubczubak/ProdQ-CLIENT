//Importy zewnętrzne
import ReactDom from 'react-dom';
import React from 'react';
import { Stack, Button, InputAdornment } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
//Importy lokalne
import styles from './css/Material.module.css';
import { Input } from '../common/Input';
import { Dimensions } from './Dimensions';
import { materialManager } from './service/materialManager';
import { calculateVolume } from './service/calcualteVolume';
import { calculateWeight } from './service/calculateWeight';
import { calculatePrice } from './service/calculatePrice';
import { calcualteTotalPrice } from './service/calcualteTotalPrice';
import { plateValidationSchema } from './validationSchema/plateValidationSchema';
import { rodValidationSchema } from './validationSchema/rodValidationSchema';
import { tubeValidationSchema } from './validationSchema/tubeValidationSchema';
import { ModalImage } from './ModalImage';

export const MaterialModal_ADD = ({ open, onClose, item }) => {
  const [weight, setWeight] = useState(0);
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

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
      x: '',
      y: '',
      z: '',
      quantity: '',
      minQuantity: '',
      pricePerKg: '',
      diameter: '',
      thickness: '',
      length: '',
      type: 'material',
      quantityInTransit: 0,
      additionalInfo: '',
      prices: []
    },
    resolver: yupResolver(validationSchema())
  });

  useEffect(() => {
    const x = watch('x'); //width
    const y = watch('y'); //height
    const z = watch('z'); //thickness
    const diameter = watch('diameter'); //diameter
    const thickness = watch('thickness'); //thickeness
    const length = watch('length'); //length
    const quantity = watch('quantity'); //quantity
    const pricePerKg = watch('pricePerKg'); //price per kg
    const volume = calculateVolume(x, y, z, diameter, thickness, length, item.type); //calculate volume
    const weight = calculateWeight(volume, item.materialType.density); //calculate weight
    const price = calculatePrice(weight, pricePerKg); //calculate price
    const totalPrice = calcualteTotalPrice(price, quantity); //calculate total price
    setWeight(weight);
    setPrice(price);
    setTotalPrice(totalPrice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch()]);

  const handleForm = (data) => {
    let name;
    switch (item.type) {
      case 'Plate':
        name = `${item.name}: ${data.z}x${data.x}x${data.y}`;
        break;
      case 'Rod':
        name = `${item.name}: ⌀${data.diameter}`;
        break;
      case 'Tube':
        name = `${item.name}: ⌀${data.diameter}x${data.thickness}`;
        break;
      default:
        name = ''; // Domyślna wartość lub obsługa błędu
    }
    data.name = name;
    data.materialGroupID = item.id;
    data.price = price;
    materialManager.createMaterial(data, queryClient, dispatch);
    onClose();
    reset();
  };

  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <div className={styles.modal_container}>
      <div className={styles.modal}>
        <ModalImage item={item} />
        <div className={styles.modal_header}>{<h2>{item.type} dimension</h2>}</div>
        <form onSubmit={handleSubmit(handleForm)}>
          <Dimensions control={control} type={item.type} watch={watch} />
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
              name="minQuantity"
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
          <Stack mt={2}>
            <Controller
              name="additionalInfo"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <TextareaAutosize
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  placeholder="Additional info"
                  minRows={2}
                  maxRows={3}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    resize: 'none',
                    outline: 'none',
                    backgroundColor: 'inherit'
                  }}
                  error={error}
                />
              )}
            />
          </Stack>

          <Stack spacing={1} mb={5} mt={2} className={styles.login_content} direction="row">
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
          <Stack
            spacing={1}
            mb={5}
            mt={2}
            className={styles.login_content}
            direction="row"
            justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(90deg, #4a90e2 0%, #63b3ed 100%)',
                '&:hover': { background: 'linear-gradient(90deg, #357abd 0%, #4a90e2 100%)' },
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}>
              Create
            </Button>
            <Button variant="text" size="large" onClick={onClose}>
              Cancel
            </Button>
          </Stack>
        </form>
      </div>
    </div>,
    document.getElementById('portal')
  );
};
