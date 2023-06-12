import { object, string } from 'yup';

export const orderItemValidationSchema = object().shape({
    orderName: string().required('Order name is required'),
    
});
