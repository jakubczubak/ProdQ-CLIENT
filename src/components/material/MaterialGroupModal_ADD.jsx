import React from 'react';
import ReactDom from 'react-dom';
import styles from './css/MaterialModal.module.css';
import { Stack, InputAdornment, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { materialGroupValidationSchema } from './validationSchema/materialGroupValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import Lottie from 'lottie-react';
import add from '../../assets/Lottie/add.json';
import { materialManager } from './service/materialManager';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from '../common/Input';
import { useDispatch } from 'react-redux';

export const MaterialGroupModal_ADD = ({ open, onClose }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      materialGroupName: '',
      materialGroupCode: '',
      materialGroupDensity: '',
      type: '',
      image: ''
    },
    resolver: yupResolver(materialGroupValidationSchema)
  });

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleForm = (data) => {
    data.materialList = [];
    onClose();
    reset();
    materialManager.postMaterial(data, queryClient, dispatch);
  };

  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      <div className={styles.modal_container}>
        <div className={styles.modal}>
          <Lottie animationData={add} loop={true} className={styles.modal_animation} />
          <div className={styles.modal_header}>
            <h2>New material group</h2>
          </div>
          <form onSubmit={handleSubmit(handleForm)}>
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
                name="materialGroupCode"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    error={error}
                    placeholder="AW-6082"
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    label="Type of material"
                  />
                )}
              />
              <Controller
                name="materialGroupDensity"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    width="200px"
                    error={error}
                    placeholder="2.6"
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
              <Controller
                name="image"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    error={error}
                    placeholder="https://www.example.com/images/example-image.jpg"
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    label="Image URL (optional)"
                    variant={'filled'}
                  />
                )}
              />
              <Controller
                name="type"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <div>
                    <ToggleButtonGroup
                      className={error ? styles.error_border : ''}
                      color="primary"
                      onBlur={onBlur}
                      value={value}
                      onChange={onChange}
                      aria-label="Platform"
                    >
                      <ToggleButton value="Plate">Plate</ToggleButton>
                      <ToggleButton value="Tube">Tube</ToggleButton>
                      <ToggleButton value="Rod">Rod</ToggleButton>
                    </ToggleButtonGroup>
                    <p className={styles.error_message}>{error ? error.message : ''}</p>
                  </div>
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
      </div>
    </>,
    document.getElementById('portal')
  );
};
