import { object, string, ref } from 'yup';

export const userValidationSchema = object().shape({
  firstName: string().required('Name is required'),
  lastName: string().required('Surname is required'),
  email: string().email('Email is not valid').required('Email is required'),
  password: string().required('Password is required'),
  confirmPassword: string()
    .required('Password did not match')
    .oneOf([ref('password')], 'Password must match')
});
