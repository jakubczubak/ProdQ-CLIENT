import { number, object } from 'yup';

export const plateValidationSchema = object().shape({
  x: number().typeError('Must be a number').min(0, 'Must be greater than 0').required('Required'),
  y: number().typeError('Must be a number').min(0, 'Must be greater than 0').required('Required'),
  z: number().typeError('Must be a number').min(0, 'Must be greater than 0').required('Required'),
  quantity: number()
    .typeError('Must be a number')
    .min(0, 'Must be greater than 0')
    .required('Required'),
  minQuantity: number()
    .typeError('Must be a number')
    .min(0, 'Must be greater than 0')
    .required('Required'),
  pricePerKg: number()
    .typeError('Must be a number')
    .min(0.01, 'Must be greater than 0')
    .required('Required')
});
