import { object, string, mixed } from 'yup';

export const materialGroupValidationSchema = object().shape({
  name: string().required('Material group name is required'),
  type: string().required('Select a type'),
  materialType: object().required('Select a material type'),
  file: mixed().test(
    'fileFormat',
    'Invalid file format. Supported formats: jpg, jpeg, png',
    (value) => {
      // If no file is provided, consider it valid.
      if (!value) {
        return true;
      }

      // Extract the file extension
      const fileExtension = value.name.split('.').pop().toLowerCase();

      // Check if the file extension is supported
      const allowedFileExtensions = ['jpg', 'jpeg', 'png'];
      return allowedFileExtensions.includes(fileExtension);
    }
  )
});
