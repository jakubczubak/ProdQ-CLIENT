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
import { productionManager } from './service/productionManager';
import { useEffect } from 'react';

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

export const ProductionModal = ({ open, onClose, item }) => {
  const { handleSubmit, control, reset, setValue } = useForm({
    defaultValues: {
      partName: item ? item.partName : '',
      quantity: item ? item.quantity : 0,
      status: item ? item.status : '',
      camTime: item ? item.camTime : 0,
      materialValue: item ? item.materialValue : 0,
      partType: item ? item.partType : '',
      startUpTime: item ? item.startUpTime : 30,
      factor: item ? item.factor : 1,
      fixtureTime: item ? item.fixtureTime : 0,
      filePDF: undefined
    },
    resolver: yupResolver(productionValidationSchema)
  });

  useEffect(() => {
    if (item) {
      setValue('partName', item.partName),
        setValue('quantity', item.quantity),
        setValue('status', item.status),
        setValue('camTime', item.camTime),
        setValue('materialValue', item.materialValue),
        setValue('partType', item.partType);
      setValue('startUpTime', item.startUpTime);
      setValue('factor', item.factor);
      setValue('fixtureTime', item.fixtureTime);
    }
  }, [item, setValue]);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleForm = (data) => {
    const formData = new FormData();

    formData.append('partName', data.partName);
    formData.append('quantity', data.quantity);
    formData.append('status', data.status);
    formData.append('camTime', data.camTime);
    formData.append('materialValue', data.materialValue);
    formData.append('partType', data.partType);
    formData.append('startUpTime', data.startUpTime);
    formData.append('factor', data.factor);
    formData.append('fixtureTime', data.fixtureTime);

    if (data.filePDF) {
      formData.append('filePDF', data.filePDF);
    }

    if (item) {
      formData.append('id', item.id);
      productionManager.updateProductionItem(formData, queryClient, dispatch);
    } else {
      productionManager.createProductionItem(formData, queryClient, dispatch);
    }
    onClose();
    reset();
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
                    size="small"
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
                    size="small"
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
                    size="small"
                  />
                )}
              />
              <Controller
                name="factor"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    error={error}
                    placeholder="1.2"
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    label="CAM factor"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">x</InputAdornment>
                    }}
                    size="small"
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
                    size="small"
                  />
                )}
              />
              <Controller
                name="startUpTime"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    error={error}
                    placeholder="200"
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    label="Startup time"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">min</InputAdornment>
                    }}
                    size="small"
                  />
                )}
              />
              <Controller
                name="fixtureTime"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
                    error={error}
                    placeholder="200"
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    label="Fixture time"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">min</InputAdornment>
                    }}
                    size="small"
                  />
                )}
              />

              <Controller
                name="filePDF"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <MuiFileInputStyled
                    label="Upload .pdf file (optional)"
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
                        accept: '.pdf'
                      },
                      startAdornment: <AttachFileIcon />
                    }}
                    size="small"
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
                        size="small"
                        className={error ? styles.error_border : ''}
                        color="primary"
                        onBlur={onBlur}
                        value={value}
                        onChange={onChange}
                        aria-label="Platform">
                        <ToggleButton value="plate">Plate</ToggleButton>
                        <ToggleButton value="part">Part</ToggleButton>
                        <ToggleButton value="modification">Modification</ToggleButton>
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
                        size="small"
                        className={error ? styles.error_border : ''}
                        color="primary"
                        onBlur={onBlur}
                        value={value}
                        onChange={onChange}
                        aria-label="Platform">
                        <ToggleButton value="inprogress">IN PROGRESS</ToggleButton>
                        <ToggleButton value="done">DONE</ToggleButton>
                      </ToggleButtonGroup>
                    </Tooltip>
                    <p className={styles.error_message}>{error ? error.message : ''}</p>
                  </div>
                )}
              />

              <Button type="submit" variant="contained" size="large">
                {item ? 'Update' : 'Create'}
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
