//Importy zewnętrzne
import React from 'react';
//Importy lokalne
import styles from './css/Material.module.css';
import plate_image from '../../assets/plate.png';
import rod_image from '../../assets/rod.png';
import tube_image from '../../assets/tube.png';

export const ModalImage = ({ item }) => {
  return (
    <>
      {item.type == 'Plate' && (
        <div className={styles.modal_image_wrapper}>
          <img src={plate_image} alt="plate" className={styles.modal_image} />
        </div>
      )}
      {item.type == 'Rod' && (
        <div className={styles.modal_image_wrapper}>
          <img src={rod_image} alt="rod" className={styles.modal_image} />
        </div>
      )}
      {item.type == 'Tube' && (
        <div className={styles.modal_image_wrapper}>
          <img src={tube_image} alt="tube" className={styles.modal_image} />
        </div>
      )}
    </>
  );
};
