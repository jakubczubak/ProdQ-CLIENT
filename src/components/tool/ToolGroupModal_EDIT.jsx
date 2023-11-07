import React from 'react';
import ReactDom from 'react-dom';
import styles from './css/ToolModal.module.css';
import { Stack, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { toolGroupValidationSchema } from './validationSchema/toolGroupValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { toolManager } from './service/toolManager';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from '../common/Input';
import { useDispatch } from 'react-redux';

export const ToolGroupModal_EDIT = ({ open, onClose, item }) => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: item.name,
      type: item.type,
      imageURL: item.imageURL
    },
    resolver: yupResolver(toolGroupValidationSchema)
  });

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleForm = (data) => {
    data.id = item.id;
    data.tools = item.tools;
    onClose(); //close modal
    toolManager.updateToolGroup(data, queryClient, dispatch); //post tool group to database
  };

  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      <div className={styles.modal_container}>
        <div className={styles.modal}>
          <div className={styles.modal_image_wrapper}>
            <img
              src={item.imageURL ? item.imageURL : require(`../../assets/tools/${item.type}.png`)}
              alt="Tool group"
              className={styles.modal_image}
            />
          </div>
          <div className={styles.modal_header}>
            <h2>Edit tool group</h2>
          </div>
          <form onSubmit={handleSubmit(handleForm)}>
            <Stack spacing={2} className={styles.login_content}>
              <Controller
                name="name"
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
                name="imageURL"
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
                Update
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
