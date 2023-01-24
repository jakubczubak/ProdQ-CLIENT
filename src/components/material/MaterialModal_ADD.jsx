import React from 'react';
import ReactDom from 'react-dom';
import styles from './MaterialModal.module.css';
import { Stack, InputAdornment, Button, IconButton } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { materialValidationSchema } from './materialValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import Lottie from 'lottie-react';
import add from '../../assets/Lottie/add.json';
import { useState } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';
import { materialManager } from './materialManager';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from './Input';

export const MaterialModal_ADD = ({ open, onClose, onOpen, onError }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { handleSubmit, control, register, reset } = useForm({
    defaultValues: {
      materialGroupName: '',
      materialGroupCode: '',
      materialGroupDensity: 0
    },
    resolver: yupResolver(materialValidationSchema)
  });

  const queryClient = useQueryClient();

  const handleForm = (data) => {
    data.picture = selectedImage;
    console.log(data);
    onClose();
    reset();
    materialManager.postMaterial(data, queryClient, onOpen, onError);
  };

  if (!open) {
    document.body.style.overflow = 'auto';
    return null;
  }

  document.body.style.overflow = 'hidden';

  return ReactDom.createPortal(
    <>
      <div className={styles.modal_container}>
        <div className={styles.modal}>
          <Lottie animationData={add} loop={true} className={styles.modal_animation} />
          <div className={styles.modal_header}>
            <h2>New material group</h2>
          </div>
          <form onSubmit={handleSubmit(handleForm)}>
            <Stack spacing={2} className={styles.login_content}>
              <Controller
                name="materialGroupName"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    error={error}
                    placeholder="Aluminium plates PA4"
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    label="Material group name"
                  />
                )}
              />
              <Controller
                name="materialGroupCode"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    error={error}
                    placeholder="AW-6082"
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    label="Type of material"
                  />
                )}
              />
              <Controller
                name="materialGroupDensity"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    width="200px"
                    error={error}
                    placeholder="2.6"
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    label="Density"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">g/cm3</InputAdornment>
                    }}
                  />
                )}
              />
              <div className={styles.modal_image_container}>
                <IconButton
                  style={{ backgroundColor: 'transparent' }}
                  disableRipple={true}
                  color="primary"
                  aria-label="upload picture"
                  component="label">
                  <input
                    {...register('picture')}
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(event) => {
                      setSelectedImage(event.target.files[0]);
                    }}
                  />
                  <UploadFileIcon />
                </IconButton>
                <p className={styles.upload_image_text}>
                  Upload image SVG, PNG, JPG or GIF (max. 3MB)
                </p>

                <div className={styles.upload_image}>
                  {selectedImage && (
                    <div className={styles.modal_image_box}>
                      <p>{selectedImage.name}</p>
                      <CloseIcon
                        color="error"
                        onClick={() => setSelectedImage(null)}
                        className={styles.close_icon}
                      />
                    </div>
                  )}
                </div>
              </div>
              <Button type="submit" variant="contained" size="large">
                Create
              </Button>
              <Button type="submit" variant="text" size="large" onClick={onClose}>
                Cancel
              </Button>
            </Stack>
          </form>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
};
