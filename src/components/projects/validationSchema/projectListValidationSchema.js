import { object, string } from 'yup';

export const projectListValidationSchema = object().shape({
  name: string().required('Name is required')
});
