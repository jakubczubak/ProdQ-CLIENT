import React, { useEffect } from 'react';
import styles from './css/MaterialTypeModal.module.css';
import ReactDom from 'react-dom';
import { useForm, Controller } from 'react-hook-form';
import { Button, Stack } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { Input } from '../common/Input';
import { InputAdornment } from '@mui/material';
import { materialTypeValidationSchema } from './service/validationSchema/materialTypeValidationSchema';
import { materialTypeManager } from './service/materialTypeManager';

export const MaterialTypeModal = ({ open, onClose, item }) => {
  const { handleSubmit, control, reset, setValue } = useForm({
    defaultValues: {
      name: '',
      density: ''
    },
    resolver: yupResolver(materialTypeValidationSchema)
  });

  useEffect(() => {
    if (item) {
      setValue('id', item.id);
      setValue('name', item.name);
      setValue('density', item.density);
    }
  }, [item, setValue]);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleForm = (data) => {
    if (item) {
      data.id = item.id;

      // materialTypeManager.updateMaterialType(item.id, data, queryClient, dispatch);
      console.log('update');
      onClose(); //close modal
      reset(); //reset form
      return;
    }

    materialTypeManager.createMaterialType(data, queryClient, dispatch);
    onClose(); //close modal
    reset(); //reset form
  };

  if (!open) {
    return null;
  }
  return ReactDom.createPortal(
    <>
      <div className={styles.modal_container}>
        <div className={styles.modal}>
          <img
            className={styles.modal_img}
            src={require('../../assets/Metale kolorowe.png')}
            alt="Tool diameter"
          />
          <div className={styles.modal_header}>
            <h2>Material type</h2>
          </div>
          <form onSubmit={handleSubmit(handleForm)}>
            <Stack spacing={2} className={styles.login_content}>
              <Controller
                name="name"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    error={error}
                    placeholder="Aluminium PA13 (AW-5083)"
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    label="Material type"
                  />
                )}
              />
              <Controller
                name="density"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    error={error}
                    placeholder="2.66"
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    label="Density"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">g/cm3</InputAdornment>
                    }}
                  />
                )}
              />

              {item ? (
                <Button type="submit" variant="contained" size="large" color="warning">
                  Update
                </Button>
              ) : (
                <Button type="submit" variant="contained" size="large">
                  Create
                </Button>
              )}
              <Button variant="text" size="large" onClick={onClose}>
                Cancel
              </Button>
            </Stack>
          </form>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
};
