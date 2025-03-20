//Importy zewnętrzne
import React from 'react';
import ReactDom from 'react-dom';
import { Stack, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from '../common/Input';
import { useDispatch } from 'react-redux';
import { MuiFileInput } from 'mui-file-input';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { styled } from '@mui/material/styles';
//Importy lokalne
import styles from './css/ToolModal.module.css';
import { toolGroupValidationSchema } from './validationSchema/toolGroupValidationSchema';
import { toolManager } from './service/toolManager';
import { FileImage } from '../common/FileImage';

const MuiFileInputStyled = styled(MuiFileInput)`
  & .MuiInputBase-root {
    cursor: pointer;
  }
  & .MuiInputBase-input {
    cursor: pointer;
  }

  & input + span {
    cursor: pointer;
  }
`;

export const ToolGroupModal_EDIT = ({ open, onClose, item }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      id: item.id,
      name: item.name,
      type: item.type,
      file: undefined
    },
    resolver: yupResolver(toolGroupValidationSchema)
  });

  const handleForm = (data) => {
    onClose(); //close modal
    const formData = new FormData();
    formData.append('id', data.id);
    formData.append('name', data.name);
    formData.append('type', data.type);
    if (data.file) {
      formData.append('file', data.file);
    }
    toolManager.updateToolGroup(formData, queryClient, dispatch); //post tool group to database
  };

  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      <div className={styles.modal_container}>
        <div className={styles.modal}>
          <div className={styles.modal_image_container}>
            <FileImage fileObject={item.fileImage} toolGroupID={item.id} toolType={item.type} />
          </div>
          <div className={styles.modal_header}>
            <h2>Edit tool group</h2>
          </div>
          <form onSubmit={handleSubmit(handleForm)}>
            <Stack spacing={2} className={styles.login_content}>
              <Controller
                name="name"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    error={error}
                    placeholder="End mill VHM"
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    label="Tool group name"
                  />
                )}
              />
              <Controller
                name="file"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <MuiFileInputStyled
                    label="Upload image file (optional)"
                    type="file"
                    clearIconButtonProps={{
                      title: 'Remove',
                      children: <CloseIcon fontSize="small" />
                    }}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={error ? true : false}
                    helperText={error ? error.message : ''}
                    InputProps={{
                      inputProps: {
                        accept: '.jpg,.jpeg,.png'
                      },
                      startAdornment: <AttachFileIcon />
                    }}
                  />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  background: 'linear-gradient(90deg, #4a90e2 0%, #63b3ed 100%)',
                  '&:hover': { background: 'linear-gradient(90deg, #357abd 0%, #4a90e2 100%)' }
                }}>
                Update
              </Button>
              <Button variant="text" size="large" onClick={onClose}>
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
