import { number, object, string } from 'yup';

export const wasteValidationSchema = object().shape({
  wasteName: string().required('Required'),
  wasteQuantity: number()
    .typeError('Must be a number')
    .min(0, 'Must be greater than 0')
    .required('Required'),
  wasteValue: number()
    .typeError('Must be a number')
    .required('Required')
});
