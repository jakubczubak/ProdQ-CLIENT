//Importy zewnętrzne
import React from 'react';
import { Tooltip } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import DeleteIcon from '@mui/icons-material/Delete';
// Importy lokalne
import styles from './css/FileImage.module.css';
import { fileImageManager } from './service/fileImageManager';

export const FileImage = ({ fileObject, materialGroupID, toolGroupID, toolType }) => {
  // Przyjmujemy, że fileObject zawiera informacje o pliku, w tym base64ImageData

  const queryClient = useQueryClient();

  if (!fileObject) {
    return (
      <div>
        <img
          src={require(`../../assets/tools/${toolType}.png`)}
          alt="empty"
          className={styles.img}
        />
      </div>
    );
  }

  const { name, type, imageData } = fileObject;

  const imgSrc = `data:${type};base64,${imageData}`;

  const handleImageDelete = () => {
    if (materialGroupID) {
      fileImageManager.deleteMaterialFileImage(fileObject.id, materialGroupID, queryClient);
    } else if (toolGroupID) {
      fileImageManager.deleteToolFileImage(fileObject.id, toolGroupID, queryClient);
    }
  };
  return (
    <div>
      <img src={imgSrc} alt={name} className={styles.img} />
      <Tooltip title="Delete this image" placement="top">
        <DeleteIcon
          color="action"
          fontSize="6px"
          className={styles.icon}
          onClick={handleImageDelete}
        />
      </Tooltip>
    </div>
  );
};
