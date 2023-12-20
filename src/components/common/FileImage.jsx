import React from 'react';
import styles from './css/FileImage.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip } from '@mui/material';
import { fileImageManager } from './service/fileImageManager';
import { useQueryClient } from '@tanstack/react-query';
import noImage from '../../assets/no-image.png';

export const FileImage = ({ fileObject, materialGroupID }) => {
  // Przyjmujemy, że fileObject zawiera informacje o pliku, w tym base64ImageData

  const queryClient = useQueryClient();

  if (!fileObject) {
    return (
      <div>
        <img src={noImage} alt="empty" className={styles.img} />
      </div>
    );
  }

  const { name, type, imageData } = fileObject;

  const imgSrc = `data:${type};base64,${imageData}`;

  const handleImageDelete = () => {
    fileImageManager.deleteFileImage(fileObject.id, materialGroupID, queryClient);
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
