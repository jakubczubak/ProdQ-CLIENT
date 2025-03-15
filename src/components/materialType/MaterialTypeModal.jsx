// Importy zewnętrzne
import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import { useForm, Controller } from 'react-hook-form';
import { Button, Stack } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { Input } from '../common/Input';
import { InputAdornment } from '@mui/material';
// Importy lokalne
import styles from './css/MaterialTypeModal.module.css';
import { materialTypeValidationSchema } from './service/validationSchema/materialTypeValidationSchema';
import { materialTypeManager } from './service/materialTypeManager';

export const MaterialTypeModal = ({ open, onClose, item }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
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

  const handleForm = (data) => {
    if (item) {
      data.id = item.id;
      materialTypeManager.updateMaterialType(data, queryClient, dispatch);
      onClose();
      reset();
      return;
    }
    materialTypeManager.createMaterialType(data, queryClient, dispatch);
    onClose();
    reset();
  };

  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <div className={styles.modal_container}>
      <div className={styles.modal}>
        <img
          className={styles.modal_img}
          src={require('../../assets/Metale kolorowe.png')}
          alt="Tool diameter"
        />
        <div className={styles.modal_header}>
          <h2>Material Type</h2>
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
                  label="Material Type"
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
                    endAdornment: <InputAdornment position="end">g/cm³</InputAdornment>
                  }}
                />
              )}
            />
            <div className={styles.btn_wrapper}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  background: 'linear-gradient(90deg, #4a90e2 0%, #63b3ed 100%)',
                  borderRadius: '10px',
                  padding: '12px',
                  width: '150px',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  boxShadow: '0 4px 12px rgba(74, 144, 226, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #357abd 0%, #4a90e2 100%)',
                    boxShadow: '0 6px 16px rgba(74, 144, 226, 0.5)',
                    transform: 'translateY(-2px)',
                  },
                  color: '#fff',
                }}
              >
                {item ? 'Update' : 'Create'}
              </Button>
              <Button
                variant="text"
                size="large"
                onClick={onClose}
                sx={{
                  color: '#767676',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  '&:hover': {
                    color: '#52565e',
                    background: 'transparent',
                  },
                }}
              >
                Cancel
              </Button>
            </div>
          </Stack>
        </form>
      </div>
    </div>,
    document.getElementById('portal')
  );
};