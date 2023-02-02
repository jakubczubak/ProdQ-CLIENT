import { number, object, string } from 'yup';

export const materialGroupValidationSchema = object().shape({
  materialGroupName: string().required('Material group name is required'),
  materialGroupCode: string().required('Material group code is required'),
  materialGroupDensity: number()
    .typeError('Density must be a number')
    .min(0, 'Density must be greater than 0')
    .required('Density is required'),
  type: string().required('Select a type'),
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
