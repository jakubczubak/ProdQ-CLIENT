import { object, string, ref } from 'yup';
import { userManager } from '../userManager';

export const userModalValidationSchema = object().shape({
  firstName: string().required('First name is required'),
  lastName: string().required('Surname is required'),
  email: string()
    .email('Email is not valid')
    .required('Email is required')
    .test('email-exists', 'User with this email already exists', async function (value) {
      if (!value) return false; // walidacja przejdzie, jeśli pole email jest puste
      return !(await userManager.checkUserByEmail(value)); // walidacja nie przejdzie, jeśli użytkownik o podanym mailu już istnieje w bazie danych
    }),
  password: string().required('Password is required'),
  confirmPassword: string()
    .required('Password did not match')
    .oneOf([ref('password')], 'Password must match')
});
