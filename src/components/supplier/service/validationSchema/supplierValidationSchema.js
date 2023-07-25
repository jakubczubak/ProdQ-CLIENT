import { object, string } from 'yup';

export const supplierValidationSchema = object().shape({
  name: string().trim().required('Name is required.'),
  surname: string().trim().required('Surname is required.'),
  phoneNumber: string()
    .trim()
    .required('Phone number is required.')
    .matches(/^\d{9}$/, 'Phone number should be 9 digits.'),
  email: string().trim().email('Invalid email format.').required('Email is required.'),
  companyName: string().trim().required('Company name is required.'),
  position: string().trim().required('Position is required.'),
  companyLogo: string()
    .url('Image must be a valid URL')
    .test('validateImage', 'Image must be a PNG, JPG or JPEG format', async (value) => {
      if (!value) return true;
      return await validateURL(value);
    }),
  companyWebsite: string().url('Invalid URL format.')
});

const validateURL = async (URL) => {
  try {
    const res = await fetch(URL, { method: 'HEAD' });

    // Check if the request was successful (status code in the 2xx range)
    if (!res.ok) {
      return false;
    }

    const contentType = res.headers.get('Content-Type');
    if (!contentType) {
      return false;
    }
    return contentType.startsWith('image/');
  } catch (error) {
    return false;
  }
};
