import { object, string } from 'yup';

export const supplierValidationSchema = object().shape({
  name: string().trim().required('Name is required.'),
  surname: string().trim().required('Surname is required.'),
  phoneNumber: string()
    .trim()
    .required('Phone number is required.')
    .matches(/^\d{9}$/, 'Phone number should be 9 digits.'),
  email: string().trim().email('Invalid email format.').required('Email is required.'),
  companyName: string().trim().required('Company name is required.'),
  position: string().trim().required('Position is required.'),
  companyLogo: string().url('Invalid URL format.'),
  companyWebsite: string().url('Invalid URL format.')
});
