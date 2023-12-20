import React from 'react';
import styles from './css/FileImage.module.css';
export const FileImage = ({ fileObject }) => {
  // Przyjmujemy, że fileObject zawiera informacje o pliku, w tym base64ImageData
  const { name, type, imageData } = fileObject;

  const imgSrc = `data:${type};base64,${imageData}`;

  return (
    <div>
      <img src={imgSrc} alt={name} className={styles.img} />
    </div>
  );
};
