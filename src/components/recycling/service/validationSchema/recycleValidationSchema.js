import { object, string } from 'yup';

export const recycleValidationSchema = object().shape({
  company: string().required('Reciver name required'),
  carID: string().required('Car ID required'),
  date: string().required('Required'),
  time: string().required('Required')
});
