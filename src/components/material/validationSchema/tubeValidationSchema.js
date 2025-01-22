import { number, object } from 'yup';

export const tubeValidationSchema = object().shape({
  quantity: number()
    .typeError('Must be a number')
    .min(0, 'Must be greater than 0')
    .required('Required'),
  minQuantity: number()
    .typeError('Must be a number')
    .min(0, 'Must be greater than 0')
    .required('Required'),
  pricePerKg: number()
    .typeError('Must be a number')
    .min(0.01, 'Must be greater than 0')
    .required('Required'),
  diameter: number()
    .typeError('Must be a number')
    .min(0, 'Must be greater than 0')
    .required('Required'),
  thickness: number()
    .typeError('Must be a number')
    .min(0, 'Must be greater than 0')
    .required('Required')
    .test(
      'thickness-less-than-half-diameter',
      'Thickness cannot be greater than half of the diameter',
      function (value) {
        const { diameter } = this.parent; // Dostęp do wartości 'diameter' z rodzica
        if (diameter && value) {
          return value < diameter / 2; // Sprawdzanie, czy thickness jest mniejszy lub równy połowie diameter
        }
        return true; // Jeśli brak 'diameter' lub 'thickness', nie waliduj
      }
    ),
  length: number()
    .typeError('Must be a number')
    .min(0, 'Must be greater than 0')
    .required('Required')
});
