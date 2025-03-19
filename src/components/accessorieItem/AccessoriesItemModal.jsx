import React from 'react';
import ReactDom from 'react-dom';
import { Stack, Button, InputAdornment } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../common/Input';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { SimpleImage } from './../common/SimpleImage';
import { useDispatch } from 'react-redux';
import { accessorieValidationSchema } from './validationSchema/accessoriesValidationSchema';
import { accessorieItemManager } from './service/AccessorieItemManager';
import styles from './css/AccessoriesItemModal.module.css';
import { useQueryClient } from '@tanstack/react-query';

export const AccessoriesItemModal = ({ open, onClose, item, accessorieItem }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      id: accessorieItem ? accessorieItem.id : '',
      name: accessorieItem ? accessorieItem.name : '',
      quantity: accessorieItem ? accessorieItem.quantity : '',
      minQuantity: accessorieItem ? accessorieItem.minQuantity : '',
      price: accessorieItem ? accessorieItem.price : '',
      link: accessorieItem ? accessorieItem.link : '',
      additionalInfo: accessorieItem ? accessorieItem.additionalInfo : '',
      type: 'accessorie',
      diameter: accessorieItem ? accessorieItem.diameter : '',
      length: accessorieItem ? accessorieItem.length : ''
    },
    resolver: yupResolver(accessorieValidationSchema)
  });

  const handleForm = (data) => {
    const accessorieName = data.name;
    data.accessorieGroupID = item.id;
    if (accessorieItem) {
      accessorieItemManager.updateAccessorieItem(data, accessorieName, queryClient, dispatch);
    } else {
      accessorieItemManager.createAccessorieItem(data, accessorieName, queryClient, dispatch);
    }
    onClose();
    reset();
  };

  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <div className={styles.modal_container}>
      <div className={styles.modal}>
        {item.fileImage ? (
          <SimpleImage fileObject={item.fileImage} />
        ) : (
          <div>
            <img
              className={styles.modal_img}
              src={require('../../assets/accessory.png')}
              alt="Tool diameter"
            />
          </div>
        )}
        <div className={styles.modal_header}>
          <h2>Accessorie details</h2>
        </div>
        <form onSubmit={handleSubmit(handleForm)}>
          <Stack spacing={1} mt={2} mb={2} className={styles.login_content} direction="row">
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
              name="price"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder="100"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Price net"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                  }}
                />
              )}
            />
          </Stack>
          <Stack spacing={1} mt={2} mb={2} className={styles.login_content} direction="row">
            <Controller
              name="diameter"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder="1"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Diameter"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">mm</InputAdornment>
                  }}
                />
              )}
            />
            <Controller
              name="length"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder="1"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Length"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">mm</InputAdornment>
                  }}
                />
              )}
            />
          </Stack>
          <Stack spacing={1} mb={1}>
            <Controller
              name="name"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder="Screw M6x20"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Accessorie name"
                />
              )}
            />
            <Controller
              name="link"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder="https://www.example.com"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="e-Shop link"
                />
              )}
            />
          </Stack>
          <Stack spacing={1} mb={2}>
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
                    border: error ? '1px solid #d32f2f' : '1px solid #ccc',
                    resize: 'none',
                    outline: 'none',
                    background: '#efefef'
                  }}
                  error={error}
                />
              )}
            />
          </Stack>
          <Stack spacing={2} direction="row" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(90deg, #4a90e2 0%, #63b3ed 100%)',
                '&:hover': { background: 'linear-gradient(90deg, #357abd 0%, #4a90e2 100%)' }
              }}>
              {accessorieItem ? 'Update' : 'Create'}
            </Button>
            <Button variant="text" size="large" onClick={onClose} sx={{ color: '#4a90e2' }}>
              Cancel
            </Button>
          </Stack>
        </form>
      </div>
    </div>,
    document.getElementById('portal')
  );
};
