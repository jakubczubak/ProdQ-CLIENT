import { object, string } from 'yup';

export const materialGroupValidationSchema = object().shape({
  materialGroupName: string().required('Material group name is required'),
  type: string().required('Select a type'),
  image: string()
    .url('Image must be a valid URL')
    .test('validateImage', 'Image must be a PNG, JPG or JPEG format', async (value) => {
      if (!value) return true;
      return await validateURL(value);
    }),
  material: object().typeError('Material is required')
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
