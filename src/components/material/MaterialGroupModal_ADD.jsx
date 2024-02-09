import React from 'react';
import ReactDom from 'react-dom';
import styles from './css/MaterialModal.module.css';
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
import { materialGroupValidationSchema } from './validationSchema/materialGroupValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { materialManager } from './service/materialManager';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from '../common/Input';
import { useDispatch } from 'react-redux';
import { materialTypeManager } from '../materialType/service/materialTypeManager';
import { useQuery } from '@tanstack/react-query';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';
import { MuiFileInput } from 'mui-file-input';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';

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
  const { data, isLoading, isError } = useQuery(
    ['material_types'],
    materialTypeManager.getMaterialTypes
  ); // fetch all materials types

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: '',
      type: '',
      file: null,
      materialType: null
    },
    resolver: yupResolver(materialGroupValidationSchema)
  });

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleForm = (data) => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('type', data.type);
    formData.append('materialTypeID', data.materialType.id);

    if (data.file) {
      formData.append('file', data.file);
    }

    materialManager.createMaterialGroup(formData, queryClient, dispatch); //post material group
    onClose(); //close modal
    reset(); //reset form
  };

  if (!open) {
    return null;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error message="Failed to fetch material types. Check console for more info." />;
  }

  if (data) {
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
                    />
                  )}
                />
                <Controller
                  name="materialType"
                  control={control}
                  render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                    <Autocomplete
                      value={value} // Tutaj używaj `value?.name`, aby obsłużyć wartość początkową (może być null)
                      options={data}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      getOptionLabel={(option) => option.name + ' - ' + option.density + ' g/cm3'}
                      onChange={(event, newValue) => {
                        onChange(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={Boolean(error)}
                          helperText={error ? error.message : ''}
                          label="Material type"
                          variant="outlined"
                          onBlur={onBlur}
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
                        inputProps: {
                          accept: '.jpg,.jpeg,.png'
                        },
                        startAdornment: <AttachFileIcon />
                      }}
                    />
                  )}
                />

                <Controller
                  name="type"
                  control={control}
                  render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                    <div>
                      <Tooltip title="Choose material type" placement="top">
                        <ToggleButtonGroup
                          fullWidth
                          className={error ? styles.error_border : ''}
                          color="primary"
                          onBlur={onBlur}
                          value={value}
                          onChange={onChange}
                          aria-label="Platform"
                        >
                          <ToggleButton value="Plate">Plate</ToggleButton>
                          <ToggleButton value="Tube">Tube</ToggleButton>
                          <ToggleButton value="Rod">Rod</ToggleButton>
                        </ToggleButtonGroup>
                      </Tooltip>
                      <p className={styles.error_message}>{error ? error.message : ''}</p>
                    </div>
                  )}
                />
                <Button type="submit" variant="contained" size="large">
                  Create
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
  }
};
