import React from 'react';
import ReactDom from 'react-dom';
import styles from './CreateMaterialGroupModal.module.css';
import { Stack, TextField, InputAdornment, Button, IconButton } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import HttpsIcon from '@mui/icons-material/Https';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { materialGroupValidationSchema } from './materialGroupValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import LoginIcon from '@mui/icons-material/Login';
import Lottie from 'lottie-react';
import add from '../../assets/Lottie/add.json';
import { useState } from 'react';
import CollectionsIcon from '@mui/icons-material/Collections';
import DeleteIcon from '@mui/icons-material/Delete';

export const CreateMaterialGroupModal = ({ open, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      materialGroupName: '',
      materialGroupCode: '',
      materialGroupDensity: 0
    },
    resolver: yupResolver(materialGroupValidationSchema)
  });

  const handleForm = (data) => {
    console.log(data);
  };

  if (!open) return null;

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
                  <TextField
                    error={!!error}
                    helperText={error ? error.message : ''}
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
                  <TextField
                    error={!!error}
                    helperText={error ? error.message : ''}
                    onBlur={onBlur}
                    value={value}
                    placeholder="AW-6082"
                    onChange={onChange}
                    label="Type of material"
                  />
                )}
              />
              <Controller
                name="materialGroupDensity"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <TextField
                    style={{ width: '50%' }}
                    error={!!error}
                    helperText={error ? error.message : ''}
                    onBlur={onBlur}
                    value={value}
                    placeholder="2.6"
                    onChange={onChange}
                    label="Density"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">g/cm3</InputAdornment>
                    }}
                  />
                )}
              />
              <div className={styles.modal_image_container}>
                <IconButton color="primary" aria-label="upload picture" component="label">
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(event) => {
                      console.log(event.target.files[0]);
                      setSelectedImage(event.target.files[0]);
                    }}
                  />
                  <CollectionsIcon />
                </IconButton>

                {selectedImage && (
                  <div className={styles.modal_image}>
                    <img
                      alt="not fount"
                      width={'250px'}
                      height={'100px'}
                      src={URL.createObjectURL(selectedImage)}
                    />
                    <DeleteIcon
                      color="error"
                      onClick={() => setSelectedImage(null)}
                      className={styles.modal_image_delete_btn}
                    />
                  </div>
                )}
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
