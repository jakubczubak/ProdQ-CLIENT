import React from 'react';
import ReactDom from 'react-dom';
import { Stack, Button, InputAdornment } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../common/Input';
import { useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/user.json';
import styles from './css/UserModal.module.css';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import KeyIcon from '@mui/icons-material/Key';
import { userModalValidationSchema } from './service/validationSchema/userModalValidationSchema';
import { userUpdateModalValidationSchema } from './service/validationSchema/userUpdateModalValidationSchema';
import { userManager } from './service/userManager';

export const UserModal = ({ open, onClose, user }) => {
  const isEditMode = user ? true : false;

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: isEditMode ? user.name : '',
      surname: isEditMode ? user.surname : '',
      email: isEditMode ? user.email : '',
      phone: isEditMode ? user.phone : '',
      password: isEditMode ? user.password : '',
      confirmPassword: isEditMode ? user.confirmPassword : '',
      isAdmin: isEditMode ? user.isAdmin : false,
      isBLocked: isEditMode ? user.isBLocked : false
    },
    resolver: isEditMode
      ? yupResolver(userUpdateModalValidationSchema)
      : yupResolver(userModalValidationSchema)
  });

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleForm = (data) => {
    if (isEditMode) {
      userManager.updateUser(data, queryClient, dispatch);
      onClose();
      return;
    }
    userManager.createUser(data, queryClient, dispatch);
    reset();
    onClose();
  };

  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <div className={styles.modal_container}>
      <div className={styles.modal}>
        <Lottie animationData={animation} loop={false} className={styles.animation} />
        <div className={styles.modal_header}>
          <h2 className={styles.modal_title}>User Form</h2>
        </div>
        <form onSubmit={handleSubmit(handleForm)}>
          <Stack spacing={1} mb={3}>
            <Controller
              name="name"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder="John"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Name"
                  variant={'standard'}
                />
              )}
            />
            <Controller
              name="surname"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder="Doe"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Surname"
                  variant={'standard'}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder="johndoe@example.com"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Email"
                  variant={'standard'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <AlternateEmailIcon />
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder="+998 90 123 45 67"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Phone"
                  variant={'standard'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <LocalPhoneIcon />
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder=""
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Password"
                  variant={'standard'}
                  type="password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <KeyIcon />
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder=""
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Confirm Password"
                  variant={'standard'}
                  type="password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <KeyIcon />
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />
          </Stack>

          <Button type="submit" variant="contained" size="large">
            {isEditMode ? 'Update' : 'Create'}
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
