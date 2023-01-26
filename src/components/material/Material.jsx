import styles from './Material.module.css';
import ReactDom from 'react-dom';
import React from 'react';
import { Stack, Button, ButtonGroup } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { materialValidationSchema } from './materialValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/logistic.json';
import { useState } from 'react';
import { materialManager } from './materialManager';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from './Input';

export const Material = ({ open, onClose }) => {
  const { handleSubmit, control, register, reset } = useForm({
    defaultValues: {
      materialGroupName: '',
      materialGroupCode: '',
      materialGroupDensity: 0
    },
    resolver: yupResolver(materialValidationSchema)
  });

  const queryClient = useQueryClient();

  const handleForm = (data) => {
    data.materialList = [];

    console.log(data);
    onClose();
    reset();
    materialManager.postMaterial(data, queryClient, onOpen, onError);
  };

  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <div className={styles.modal_container}>
      <div className={styles.modal}>
        <Lottie animationData={animation} loop={true} className={styles.modal_animation} />
        <div className={styles.modal_header}>
          <h2>New material</h2>
        </div>
        <form onSubmit={handleSubmit(handleForm)}>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button color="error">Plate</Button>
            <Button>Rod</Button>
            <Button>Tube</Button>
          </ButtonGroup>
          <Stack spacing={2} className={styles.login_content}>
            <Controller
              name="materialGroupName"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder="Aluminium plates PA4"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Material group name"
                />
              )}
            />
            <Controller
              name="materialGroupName"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder="Aluminium plates PA4"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Material group name"
                  width={100}
                />
              )}
            />
            <Controller
              name="materialGroupName"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder="Aluminium plates PA4"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Material group name"
                  width={100}
                />
              )}
            />
            <Button type="submit" variant="contained" size="large">
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
