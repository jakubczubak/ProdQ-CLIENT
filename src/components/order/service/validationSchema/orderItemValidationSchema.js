import { object, string } from 'yup';

export const orderItemValidationSchema = object().shape({
  name: string().required('Order name is required')
});
