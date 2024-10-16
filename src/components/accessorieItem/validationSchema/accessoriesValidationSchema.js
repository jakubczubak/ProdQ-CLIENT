import { object, number, string } from 'yup';

export const accessorieValidationSchema = object().shape({
  quantity: number()
    .typeError('Must be a number')
    .min(0, 'Must be greater than 0')
    .required('Required'),
  minQuantity: number()
    .typeError('Must be a number')
    .min(0, 'Must be greater than 0')
    .required('Required'),
  price: number()
    .typeError('Must be a number')
    .min(0.01, 'Must be greater than 0')
    .required('Required'),
  additionalInfo: string(),
  link: string(),
  name: string().required('Required'),
  diameter: number().typeError('Must be a number').min(0, 'Must be greater than 0'),
  length: number().typeError('Must be a number').min(0, 'Must be greater than 0')
});
