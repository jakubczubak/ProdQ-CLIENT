import React from 'react';
import styles from './css/ProjectListModal.module.css';
import ReactDom from 'react-dom';
import { Controller } from 'react-hook-form';
import { Stack, Button } from '@mui/material';
import { Input } from '../common/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { projectListValidationSchema } from './validationSchema/projectListValidationSchema';
import animation from '../../assets/Lottie/project.json';
import Lottie from 'lottie-react';

export const ProjectListModal = ({ open, item, onClose }) => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(projectListValidationSchema)
  });

  const handleForm = (data) => {
    console.log(data);
  };

  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      <div className={styles.modal_container}>
        <div className={styles.modal}>
          <Lottie animationData={animation} loop={true} className={styles.animation} />
          <div className={styles.modal_header}>
            <h2>Project name</h2>
          </div>
          <form onSubmit={handleSubmit(handleForm)}>
            <Stack spacing={2} className={styles.login_content}>
              <Controller
                name="name"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    variant="standard"
                    error={error}
                    placeholder="LSR10"
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    label="Project name"
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
