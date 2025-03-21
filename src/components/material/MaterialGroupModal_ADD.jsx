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
  TextField,
  Tooltip
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import { Input } from '../common/Input';
import { useDispatch } from 'react-redux';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';
import { MuiFileInput } from 'mui-file-input';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';

// Lokalne importy
import styles from './css/MaterialModal.module.css';
import { materialGroupValidationSchema } from './validationSchema/materialGroupValidationSchema';
import { materialManager } from './service/materialManager';
import { useQueryClient } from '@tanstack/react-query';
import { materialTypeManager } from '../materialType/service/materialTypeManager';

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

export const MaterialGroupModal_ADD = ({ open, onClose }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useQuery(
    ['material_types'],
    materialTypeManager.getMaterialTypes
  );

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: '',
      type: '',
      file: null,
      materialType: null
    },
    resolver: yupResolver(materialGroupValidationSchema)
  });

  const handleForm = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('type', data.type);
    formData.append('materialTypeID', data.materialType.id);
    if (data.file) formData.append('file', data.file);
    materialManager.createMaterialGroup(formData, queryClient, dispatch);
    onClose();
    reset();
  };

  if (!open) return null;
  if (isLoading) return <Loader />;
  if (isError)
    return <Error message="Failed to fetch material types. Check console for more info." />;

  return ReactDom.createPortal(
    <>
      <div className={styles.modal_container}>
        <div className={styles.modal}>
          <img
            className={styles.modal_img}
            src={require('../../assets/Metale kolorowe.png')}
            alt="Tool diameter"
          />
          <div className={styles.modal_header}>
            <h2>Material groups</h2>
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
                    value={value}
                    options={data.sort((a, b) => a.name.localeCompare(b.name))}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    getOptionLabel={(option) => `${option.name} - ${option.density} g/cm3`}
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
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          background:
                            'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 245, 245, 0.9) 100%)',
                          backdropFilter: 'blur(8px)',
                          borderRadius: '10px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          '& .MuiMenuItem-root': {
                            background: 'transparent',
                            transition: 'background 0.3s ease-in-out',
                            '&:hover': {
                              background:
                                'linear-gradient(135deg, rgba(230, 235, 240, 0.95) 0%, rgba(245, 245, 245, 0.9) 100%)'
                            },
                            '&.Mui-selected': {
                              background:
                                'linear-gradient(135deg, rgba(74, 144, 226, 0.2) 0%, rgba(99, 179, 237, 0.2) 100%)'
                            }
                          }
                        }
                      }
                    }}
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
                      sx: {
                        background: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '8px'
                      }
                    }}
                  />
                )}
              />
              <Controller
                name="type"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <div>
                    <Tooltip
                      PopperProps={{ disablePortal: true }}
                      title="Choose material type"
                      placement="top">
                      <ToggleButtonGroup
                        fullWidth
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
                            transition: 'background 0.3s ease-in-out',
                            '&:hover': {
                              background:
                                'linear-gradient(90deg, rgba(74, 144, 226, 0.1) 0%, rgba(99, 179, 237, 0.1) 100%)'
                            },
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
                    </Tooltip>
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
                Create
              </Button>
              <Button
                variant="text"
                size="large"
                onClick={onClose}
                sx={{
                  color: '#4a90e2',
                  '&:hover': { color: '#357abd' }
                }}>
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
