// Zewnętrzne importy
import React from 'react';
import ReactDom from 'react-dom';
import { styled } from '@mui/material/styles';
import {
  Stack,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Autocomplete,
  TextField
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MuiFileInput } from 'mui-file-input';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from '../common/Input';
import { useDispatch } from 'react-redux';

// Lokalne importy
import styles from './css/MaterialModal.module.css';
import { materialGroupValidationSchema } from './validationSchema/materialGroupValidationSchema';
import { materialManager } from './service/materialManager';
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

export const MaterialGroupModal_EDIT = ({ open, onClose, item }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      id: item.id,
      name: item.name,
      type: item.type,
      materialType: item.materialType,
      file: undefined
    },
    resolver: yupResolver(materialGroupValidationSchema)
  });

  const handleForm = (data) => {
    const formData = new FormData();
    formData.append('id', data.id);
    formData.append('name', data.name);
    formData.append('type', data.type);
    formData.append('materialTypeID', data.materialType.id);
    if (data.file) formData.append('file', data.file);
    onClose();
    materialManager.updateMaterialGroup(formData, queryClient, dispatch);
  };

  if (!open) return null;

  return ReactDom.createPortal(
    <div className={styles.modal_container}>
      <div className={styles.modal} sx={{ animation: 'fadeIn 0.5s ease-in-out' }}>
        <div className={styles.modal_image_container}>
          <FileImage fileObject={item.fileImage} materialGroupID={item.id} />
        </div>
        <div className={styles.modal_header}>
          <h2>Update material group</h2>
        </div>
        <form onSubmit={handleSubmit(handleForm)}>
          <Stack spacing={2} className={styles.login_content}>
            <Controller
              name="name"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder="Aluminium plates PA4"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Material group name"
                  sx={{
                    '& .MuiInputBase-root': {
                      background: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px'
                    }
                  }}
                />
              )}
            />
            <Controller
              name="materialType"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Autocomplete
                  isOptionEqualToValue={(option, value) => option.name === value.name}
                  value={value}
                  options={[]}
                  disabled
                  getOptionLabel={(option) => option.name + ' - ' + option.density + ' g/cm3'}
                  onChange={(event, newValue) => onChange(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={Boolean(error)}
                      helperText={error ? error.message : ''}
                      label="Material type"
                      variant="outlined"
                      onBlur={onBlur}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          background: 'rgba(255, 255, 255, 0.9)',
                          borderRadius: '8px',
                          '& fieldset': { borderColor: error ? '#d32f2f' : '#ccc' },
                          '&:hover fieldset': { borderColor: '#4a90e2' },
                          '&.Mui-focused fieldset': { borderColor: '#4a90e2' }
                        }
                      }}
                    />
                  )}
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
                    inputProps: { accept: '.jpg,.jpeg,.png' },
                    startAdornment: <AttachFileIcon />,
                    sx: { background: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px' }
                  }}
                />
              )}
            />
            <Controller
              name="type"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <div>
                  <ToggleButtonGroup
                    fullWidth
                    disabled
                    className={error ? styles.error_border : ''}
                    color="primary"
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    aria-label="Platform"
                    sx={{
                      background: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      '& .MuiToggleButton-root': {
                        '&.Mui-selected': {
                          background: 'linear-gradient(90deg, #4a90e2 0%, #63b3ed 100%)',
                          color: '#fff'
                        }
                      }
                    }}>
                    <ToggleButton value="Plate">Plate</ToggleButton>
                    <ToggleButton value="Tube">Tube</ToggleButton>
                    <ToggleButton value="Rod">Rod</ToggleButton>
                  </ToggleButtonGroup>
                  <p className={styles.error_message}>{error ? error.message : ''}</p>
                </div>
              )}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(90deg, #4a90e2 0%, #63b3ed 100%)',
                '&:hover': { background: 'linear-gradient(90deg, #357abd 0%, #4a90e2 100%)' },
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}>
              Update
            </Button>
            <Button
              variant="text"
              size="large"
              onClick={onClose}
              sx={{ color: '#4a90e2', '&:hover': { color: '#357abd' } }}>
              Cancel
            </Button>
          </Stack>
        </form>
      </div>
    </div>,
    document.getElementById('portal')
  );
};
