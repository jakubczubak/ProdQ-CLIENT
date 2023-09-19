import { object, string, number } from 'yup';

export const cncJobValidationSchema = object().shape({
  device_name: string().required('Device name is required'),
  content: string().required('Content is required'),
  type: string().required('Type is required'),
  material: string(),
  dimensions: string(),
  link: string().required('Link is required'),
  time: number(),
  quantity: number(),
  total_time: number(),
  message: string()
});
