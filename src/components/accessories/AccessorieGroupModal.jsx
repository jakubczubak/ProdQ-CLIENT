import React from 'react';
import ReactDom from 'react-dom';
import { Controller } from 'react-hook-form';
import { Stack, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { accessoryListValidationSchema } from './validationSchema/accessoryListValidationSchema';
import { accessorieManager } from './service/AccessorieManager';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import { MuiFileInput } from 'mui-file-input';
import { styled } from '@mui/material/styles';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './css/AccessorieGroupModal.module.css';
import { Input } from '../common/Input';

const MuiFileInputStyled = styled(MuiFileInput)`
  & .MuiInputBase-root {
    cursor: pointer;
  }
  & .MuiInputBase-input {
    cursor: pointer;
  }

  & input + span {
    cursor: pointer;
  }
`;

export const AccessorieGroupModal = ({ open, item, onClose }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { handleSubmit, control, setValue, reset } = useForm({
    defaultValues: {
      id: item ? item.id : undefined,
      name: item ? item.name : '',
      file: undefined
    },
    resolver: yupResolver(accessoryListValidationSchema)
  });

  useEffect(() => {
    if (item) {
      setValue('name', item.name);
    }
  }, [item, setValue]);

  const handleForm = (data) => {
    if (item) {
      const formData = new FormData();
      formData.append('id', data.id);
      formData.append('name', data.name);
      if (data.file) {
        formData.append('file', data.file);
      }
      accessorieManager.updateAccessorie(formData, queryClient, dispatch);
      onClose();
    } else {
      const formData = new FormData();
      if (data.file) {
        formData.append('file', data.file);
      }
      formData.append('name', data.name);
      reset(); //reset form
      accessorieManager.createAccessorie(formData, queryClient, dispatch);
      onClose();
    }
  };

  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      <div className={styles.modal_container}>
        <div className={styles.modal}>
          <div>
            <img src={require('../../assets/accessory.png')} alt="Projects" />
          </div>
          <div className={styles.modal_header}>
            <h2>Accessory groups</h2>
          </div>
          <form onSubmit={handleSubmit(handleForm)}>
            <Stack spacing={2} className={styles.login_content}>
              <Controller
                name="name"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    variant="outlined"
                    error={error}
                    placeholder="Accessory group name"
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    label="Accessory group name"
                  />
                )}
              />
              <Controller
                name="file"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <MuiFileInputStyled
                    label="Upload image file (optional)"
                    type="file"
                    clearIconButtonProps={{
                      title: 'Remove',
                      children: <CloseIcon fontSize="small" />
                    }}
                    onChange={() => onChange(event.target.files[0])}
                    onBlur={onBlur}
                    value={value}
                    error={error ? true : false}
                    helperText={error ? error.message : ''}
                    InputProps={{
                      inputProps: {
                        accept: '.jpg,.jpeg,.png'
                      },
                      startAdornment: <AttachFileIcon />
                    }}
                  />
                )}
              />
              {item ? (
                <Button type="submit" variant="contained" size="large" color="info">
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
