import React from 'react';
import ReactDom from 'react-dom';
import styles from './css/ProductionModal.module.css';
import { styled } from '@mui/material/styles';
import { Stack, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from '../common/Input';
import { useDispatch } from 'react-redux';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import { MuiFileInput } from 'mui-file-input';
import { Tooltip } from '@mui/material';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { productionValidationSchema } from './validationSchema/productionValidationSchema';

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

export const ProductionModal = ({ open, onClose }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      partName: '',
      quantity: 0,
      date: '',
      status: '',
      camTime: 0,
      materialValue: 0,
      partType: '',
      file: undefined
    },
    resolver: yupResolver(productionValidationSchema)
  });

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleForm = (data) => {
    console.log(data);
  };

  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      <div className={styles.modal_container}>
        <div className={styles.modal}>
          <img
            className={styles.modal_img}
            src={require('../../assets/cnc-parts.webp')}
            alt="CNC Parts"
          />

          <div className={styles.modal_header}>
            <h2>Production item</h2>
          </div>
          <form onSubmit={handleSubmit(handleForm)}>
            <Stack spacing={2} className={styles.login_content}>
              <Controller
                name="partName"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    error={error}
                    placeholder="03-04-TG_CDT2500_PIN"
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    label="Part name"
                  />
                )}
              />
              <Controller
                name="quantity"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    error={error}
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    label="Quantity"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">x</InputAdornment>
                    }}
                  />
                )}
              />
              <Controller
                name="camTime"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    error={error}
                    placeholder="90"
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    label="CAM time"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">min</InputAdornment>
                    }}
                  />
                )}
              />
              <Controller
                name="materialValue"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    error={error}
                    placeholder="200"
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    label="Material value"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                    }}
                  />
                )}
              />
              <Controller
                name="file"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <MuiFileInputStyled
                    label="Upload PDF file (optional)"
                    type="file"
                    clearIconButtonProps={{
                      title: 'Remove',
                      children: <CloseIcon fontSize="small" />
                    }}
                    onChange={() => onChange(event.target.files[0])}
                    onBlur={onBlur}
                    value={value}
                    error={error ? true : false}
                    helperText={error ? error.message : ''}
                    InputProps={{
                      inputProps: {
                        accept: '.pdf'
                      },
                      startAdornment: <AttachFileIcon />
                    }}
                  />
                )}
              />
              <Controller
                name="partType"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <div>
                    <Tooltip title="Choose production type" placement="top">
                      <ToggleButtonGroup
                        className={error ? styles.error_border : ''}
                        color="primary"
                        onBlur={onBlur}
                        value={value}
                        onChange={onChange}
                        aria-label="Platform">
                        <ToggleButton value="Plate">Plate</ToggleButton>
                        <ToggleButton value="Part">Part</ToggleButton>
                        <ToggleButton value="Modification">Modification</ToggleButton>
                      </ToggleButtonGroup>
                    </Tooltip>
                    <p className={styles.error_message}>{error ? error.message : ''}</p>
                  </div>
                )}
              />
              <Controller
                name="status"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <div>
                    <Tooltip title="Choose production type" placement="top">
                      <ToggleButtonGroup
                        className={error ? styles.error_border : ''}
                        color="primary"
                        onBlur={onBlur}
                        value={value}
                        onChange={onChange}
                        aria-label="Platform">
                        <ToggleButton value="Tube">in progress</ToggleButton>
                        <ToggleButton value="Rod">FINISH</ToggleButton>
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
};
