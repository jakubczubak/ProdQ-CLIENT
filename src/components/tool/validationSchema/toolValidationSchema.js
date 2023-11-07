import { object, string, number } from 'yup';

export const toolValidationSchema = object().shape({
  dc: number().typeError('Must be a number').min(0, 'Must be greater than 0').required('Required'),
  cfl: number().typeError('Must be a number').min(0, 'Must be greater than 0').required('Required'),
  oal: number().typeError('Must be a number').min(0, 'Must be greater than 0').required('Required'),
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
    .min(0, 'Must be greater than 0')
    .required('Required'),
  toolID: string(),
  additionalInfo: string(),
  name: string().required('Required'),
  eShopLink: string()
});
