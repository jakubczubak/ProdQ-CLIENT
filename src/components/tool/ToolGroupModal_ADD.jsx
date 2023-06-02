import React from 'react';
import ReactDom from 'react-dom';
import styles from './css/ToolModal.module.css';
import { Stack, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { toolGroupValidationSchema } from './validationSchema/toolGroupValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { toolManager } from './service/toolManager';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from '../common/Input';
import { useDispatch } from 'react-redux';

export const ToolGroupModal_ADD = ({ open, onClose }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      toolGroupName: '',
      image: ''
    },
    resolver: yupResolver(toolGroupValidationSchema)
  });

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleForm = (data) => {
    //data is the form data
    data.toolList = []; //create empty array
    onClose(); //close modal
    reset(); //reset form
    toolManager.createToolGroup(data, queryClient, dispatch); //post tool group to database
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
            src={require('../../assets/tools.png')}
            alt="Tool diameter"
          />

          <div className={styles.modal_header}>
            <h2>Tool groups</h2>
          </div>
          <form onSubmit={handleSubmit(handleForm)}>
            <Stack spacing={2} className={styles.login_content}>
              <Controller
                name="toolGroupName"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    error={error}
                    placeholder="End mill VHM"
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    label="Tool group name"
                  />
                )}
              />
              <Controller
                name="toolGroupType"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <FormControl fullWidth error={error}>
                    <InputLabel id="select-label">Type of tool group</InputLabel>
                    <Select
                      labelId="select-label"
                      value={value}
                      onBlur={onBlur}
                      label="Type of tool group"
                      onChange={onChange}>
                      <MenuItem value={1}>End mill</MenuItem>
                      <MenuItem value={2}>Radius end mill</MenuItem>
                      <MenuItem value={3}>Ball end mill</MenuItem>
                      <MenuItem value={4}>Milling cutter head</MenuItem>
                      <MenuItem value={5}>Dovetail end mill</MenuItem>
                      <MenuItem value={6}>Tapered end mill</MenuItem>
                      <MenuItem value={7}>Rounded tapered end mill</MenuItem>
                      <MenuItem value={8}>T-slot milling cutter</MenuItem>
                      <MenuItem value={9}>Ball cutter</MenuItem>
                      <MenuItem value={10}>Engraving cutter</MenuItem>
                      <MenuItem value={11}>Counterbore drill</MenuItem>
                      <MenuItem value={12}>Countersink</MenuItem>
                      <MenuItem value={13}>Drill</MenuItem>
                      <MenuItem value={14}>Chamfer drill</MenuItem>
                      <MenuItem value={15}>Tap</MenuItem>
                      <MenuItem value={16}>Reamer</MenuItem>
                      <MenuItem value={17}>Boring bar</MenuItem>
                      <MenuItem value={18}>Thread milling cutter</MenuItem>
                      <MenuItem value={19}>Tapered thread milling cutter</MenuItem>
                      <MenuItem value={21}>Saw</MenuItem>
                      <MenuItem value={22}>Milling cutters</MenuItem>
                      <MenuItem value={23}>Turning inserts</MenuItem>
                      <MenuItem value={24}>Turning tools</MenuItem>
                      <MenuItem value={25}>Others</MenuItem>
                    </Select>
                  </FormControl>
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
