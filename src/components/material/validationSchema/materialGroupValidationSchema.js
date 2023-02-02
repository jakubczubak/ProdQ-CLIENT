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
