import { object, string } from 'yup';

export const materialGroupValidationSchema = object().shape({
  name: string().required('Material group name is required'),
  type: string().required('Select a type'),
  imageURL: string()
    .url('Image must be a valid URL')
    .test('validateImage', 'Invalid image URL. Please enter a valid image URL.', async (value) => {
      if (!value) return true;
      return await validateImageURL(value);
    }),
  materialDescription: object().typeError('Material is required')
});

const validateImageURL = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });

    if (!response.ok) {
      // Nieudane żądanie (np. błąd 404)
      return false;
    }

    const contentType = response.headers.get('Content-Type');

    if (!contentType) {
      // Brak nagłówka Content-Type
      return false;
    }

    // Sprawdzamy, czy typ MIME wskazuje na obraz
    if (contentType.startsWith('image/')) {
      // Jeśli Content-Type wskazuje na obraz, możemy uznać, że URL zawiera obraz
      return true;
    } else {
      // Jeśli Content-Type nie wskazuje na obraz, możemy dodatkowo przeszukać zawartość pliku obrazu
      // (to jest bardziej zaawansowane i bardziej kosztowne)
      const blob = await fetch(url).then((res) => res.blob());

      // Sprawdzamy, czy zawartość pliku obrazu jest zgodna z formatami obrazów
      const isImage = await isBlobImage(blob);

      return isImage;
    }
  } catch (error) {
    // Błąd podczas sprawdzania URL
    console.error('Error validating image URL:', error);
    return false;
  }
};

const isBlobImage = async (blob) => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const arr = new Uint8Array(reader.result).subarray(0, 4);
      let header = '';

      for (const value of arr) {
        header += value.toString(16);
      }

      // Sprawdzamy pierwsze bajty pliku obrazu
      resolve(
        ['8950', '4749', 'ffd8', '424d'].some((validHeader) => header.startsWith(validHeader))
      );
    };

    reader.readAsArrayBuffer(blob);
  });
};
