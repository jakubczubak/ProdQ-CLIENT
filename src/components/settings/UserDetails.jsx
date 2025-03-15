// Importy zewnętrzne
import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

// Importy lokalne
import styles from './css/UserDetails.module.css';
import { userValidationSchema } from './service/validationSchema/userValidationSchema';
import { userManager } from './service/userManager';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';
import { UserOverview } from './UserOverview';
import { UserForm } from './UserForm';

export const UserDetails = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useQuery(['userData'], () => userManager.getUserData());
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isPassword: false,
      confirmPassword: '',
      actualPassword: ''
    },
    resolver: yupResolver(userValidationSchema)
  });

  useEffect(() => {
    if (data) {
      setValue('id', data.id);
      setValue('firstName', data.firstName);
      setValue('lastName', data.lastName);
      setValue('email', data.email);
    }
  }, [data, setValue]);

  const onSubmit = (data) => {
    userManager.updateUser(data, queryClient, dispatch);
    setValue('actualPassword', '');
    setValue('password', '');
    setValue('confirmPassword', '');
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error message="Failed to fetch user data. Check console for more info." />;
  }

  if (data) {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.userDetails_container}>
          <UserOverview data={data} />
          <UserForm control={control} />
        </div>
        <div className={styles.userDetails_wrapper}>
          <Button
            variant="contained"
            size="large"
            type="submit"
            sx={{
              background: 'linear-gradient(90deg, #4a90e2 0%, #63b3ed 100%)',
              borderRadius: '10px',
              padding: '12px',
              width: '200px',
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
            Save
          </Button>
        </div>
      </form>
    );
  }
};