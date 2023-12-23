import { object, string } from 'yup';

export const toolGroupValidationSchema = object().shape({
  name: string().required('Tool group name is required'),
  type: string().required('Tool group type is required')
});
