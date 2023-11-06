import { object, string } from 'yup';

export const toolGroupValidationSchema = object().shape({
  name: string().required('Tool group name is required'),
  type: string().required('Tool group type is required'),
  imageURL: string()
    .url('Image must be a valid URL')
    .test('validateImage', 'Image must be a PNG, JPG or JPEG format', async (value) => {
      if (!value) return true;
      return await validateURL(value);
    })
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
