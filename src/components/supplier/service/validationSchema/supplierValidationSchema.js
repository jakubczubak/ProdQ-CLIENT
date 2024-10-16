import { object, string } from 'yup';

export const supplierValidationSchema = object().shape({
  name: string().trim().required('Name is required.'),
  surname: string().trim().required('Surname is required.'),
  phoneNumber: string().trim(),
  email: string().trim().email('Invalid email format.').required('Email is required.'),
  companyName: string().trim().required('Company name is required.'),
  position: string().trim(),
  companyWebsite: string().url('Invalid URL format.')
});
