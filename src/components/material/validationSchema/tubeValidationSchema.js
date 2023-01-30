import { number, object } from 'yup';

export const tubeValidationSchema = object().shape({
  quantity: number()
    .typeError('Must be a number')
    .min(0, 'Must be greater than 0')
    .required('Required'),
  min_quantity: number()
    .typeError('Must be a number')
    .min(0, 'Must be greater than 0')
    .required('Required'),
  price: number()
    .typeError('Must be a number')
    .min(0, 'Must be greater than 0')
    .required('Required'),
  diameter: number()
    .typeError('Must be a number')
    .min(0, 'Must be greater than 0')
    .required('Required'),
  thickeness: number()
    .typeError('Must be a number')
    .min(0, 'Must be greater than 0')
    .required('Required'),
  length: number()
    .typeError('Must be a number')
    .min(0, 'Must be greater than 0')
    .required('Required')
});
