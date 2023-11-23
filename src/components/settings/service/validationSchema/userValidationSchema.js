import { object, string, ref, boolean } from 'yup';

export const userValidationSchema = object().shape(
  {
    firstName: string().required('Name is required'),
    lastName: string().required('Surname is required'),
    email: string().email('Email is not valid').required('Email is required'),
    isPassword: boolean(),
    password: string(),
    confirmPassword: string().oneOf([ref('password'), null], 'Passwords must match'),
    actualPassword: string().required('Actual password is required')
  },
  [['password', 'confirmPassword']]
);
