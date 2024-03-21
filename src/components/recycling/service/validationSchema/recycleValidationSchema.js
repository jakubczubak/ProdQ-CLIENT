import { object, string } from 'yup';

export const recycleValidationSchema = object().shape({
  company: string().required('Reciver name required'),
  date: string().required('Required'),
  time: string().required('Required')
});
