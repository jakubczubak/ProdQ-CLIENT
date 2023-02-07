import { object, string } from 'yup';

export const toolGroupValidationSchema = object().shape({
  toolGroupName: string().required('Tool group name is required'),
  image: string()
    .url('Image must be a valid URL')
    .test('validateImage', 'Image must be a PNG, JPG or JPEG format', async (value) => {
      if (!value) return true;
      return await validateURL(value);
    })
});

const validateURL = async (memeURL) => {
  try {
    const res = await fetch(memeURL, { method: 'HEAD' });
    const contentType = res.headers.get('Content-Type');
    if (!contentType) {
      return false;
    }
    return contentType.startsWith('image/');
  } catch (error) {
    return false;
  }
};
