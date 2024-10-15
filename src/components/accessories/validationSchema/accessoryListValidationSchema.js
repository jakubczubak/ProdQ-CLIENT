import { object, string } from 'yup';
export const accessoryListValidationSchema = object().shape({
  name: string().required('Accessory name is required')
});
