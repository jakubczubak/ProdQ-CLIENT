//Importy zewnętrzne
import React from 'react';
//Importy lokalne
import styles from './css/SimpleImage.module.css';

export const SimpleImage = ({ fileObject }) => {
  if (!fileObject) {
    return null;
  }
  const { name, type, imageData } = fileObject;
  const imgSrc = `data:${type};base64,${imageData}`;
  return (
    <div className={styles.img_wrapper}>
      <img src={imgSrc} alt={name} className={styles.img} />
    </div>
  );
};
