import styles from './Material.module.css';
import ReactDom from 'react-dom';
import React from 'react';
import { Stack, Button, InputAdornment } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { materialItemValidationSchema } from './materialItemValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/add.json';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from './Input';

export const Material = ({ open, onClose, type }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      x: '',
      y: '',
      z: '',
      quantity: '',
      min_quantity: '',
      price: ''
    },
    resolver: yupResolver(materialItemValidationSchema)
  });

  const queryClient = useQueryClient();

  const handleForm = (data) => {
    console.log(data);
    onClose();
    reset();
  };

  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <div className={styles.modal_container}>
      <div className={styles.modal}>
        <Lottie animationData={animation} loop={true} className={styles.modal_animation} />
        <div className={styles.modal_header}>
          <h2>New position</h2>
        </div>
        <form onSubmit={handleSubmit(handleForm)}>
          <Stack spacing={1} className={styles.login_content} direction="row">
            <Controller
              name="x"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder="415"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Width"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">mm</InputAdornment>
                  }}
                />
              )}
            />
            <Controller
              name="y"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder="575"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Height"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">mm</InputAdornment>
                  }}
                />
              )}
            />
            <Controller
              name="z"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder="10"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Thickness"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">mm</InputAdornment>
                  }}
                />
              )}
            />
          </Stack>
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
              name="price"
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
              label="Price"
              disabled
              variant="filled"
              InputProps={{
                endAdornment: <InputAdornment position="end">PLN</InputAdornment>
              }}
            />
            <Input
              label="Weight"
              disabled
              variant="filled"
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>
              }}
            />
            <Input
              label="Total"
              disabled
              variant="filled"
              InputProps={{
                endAdornment: <InputAdornment position="end">PLN</InputAdornment>
              }}
            />
          </Stack>
          <Button type="submit" variant="contained" size="large">
            Create
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
