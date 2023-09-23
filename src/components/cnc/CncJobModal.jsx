import React from 'react';
import styles from './css/CncJobModal.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { cncJobValidationSchema } from './service/validationSchema/cncJobValidationSchema';
import { Button } from '@mui/material';
import { Input } from '../common/Input';
import { Controller } from 'react-hook-form';
import { Stack } from '@mui/material';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/plus.json';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import ReactDom from 'react-dom';
import { InputAdornment } from '@mui/material';

export const CncJobModal = ({ open, onClose }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      device_name: '',
      content: '',
      type: 'plate',
      material: '',
      dimensions: '',
      link: '',
      time: 0,
      quantity: 0,
      total_time: 0,
      message: ''
    },
    resolver: yupResolver(cncJobValidationSchema)
  });

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
        <div className={styles.animation_wrapper}>
          <Lottie animationData={animation} />
        </div>
        <div className={styles.modal_header}>
          <h1>CNC order</h1>
        </div>
        <form onSubmit={handleSubmit(handleForm)}>
          <Stack spacing={1} mb={3}>
            <Controller
              name="device_name"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Device name"
                  size="small"
                />
              )}
            />
            <Controller
              name="content"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Name"
                  size="small"
                />
              )}
            />
            <Controller
              name="type"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <FormControl className={styles.centered_radio_group}>
                  <RadioGroup
                    row
                    value={value}
                    error={!!error}
                    helperText={error ? error.message : ''}
                    onBlur={onBlur}
                    onChange={onChange}
                  >
                    <FormControlLabel
                      value="plate"
                      control={<Radio />}
                      label="Plate "
                      labelPlacement="bottom"
                    />
                    <FormControlLabel
                      value="part"
                      control={<Radio />}
                      label="Part"
                      labelPlacement="bottom"
                    />
                    <FormControlLabel
                      value="modification"
                      control={<Radio />}
                      label="Modification"
                      labelPlacement="bottom"
                    />
                  </RadioGroup>
                </FormControl>
              )}
            />
            <Controller
              name="material"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Material"
                  size="small"
                />
              )}
            />
            <Controller
              name="dimensions"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Dimensions"
                  size="small"
                />
              )}
            />
            <Controller
              name="link"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Link"
                  size="small"
                />
              )}
            />
          </Stack>
          <Stack spacing={1} mb={3} direction="row">
            <Controller
              name="time"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="CAM time"
                  size="small"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">h</InputAdornment>
                  }}
                />
              )}
            />
            <Controller
              name="quantity"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Quantity"
                  size="small"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">x</InputAdornment>
                  }}
                />
              )}
            />
            <Controller
              name="total_time"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  disabled
                  label="CAM total time"
                  size="small"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">h</InputAdornment>
                  }}
                />
              )}
            />
          </Stack>
          <Stack mb={3}>
            <Controller
              name="message"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <TextareaAutosize
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  placeholder="Comments..."
                  minRows={3}
                  maxRows={5}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    resize: 'none',
                    outline: 'none',
                    backgroundColor: 'inherit',
                    color: '#52565e'
                  }}
                  error={error}
                />
              )}
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
