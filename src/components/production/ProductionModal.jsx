// Importy zewnętrzne
import React from 'react';
import ReactDom from 'react-dom';
import { styled } from '@mui/material/styles';
import { Stack, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import { MuiFileInput } from 'mui-file-input';
import { Tooltip } from '@mui/material';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { useEffect } from 'react';
import { Divider } from '@mui/material';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';

// Importy lokalne
import { Input } from '../common/Input';
import { productionValidationSchema } from './validationSchema/productionValidationSchema';
import { productionManager } from './service/productionManager';
import { MaterialValueCalculator } from './MaterialValueCalculator';
import styles from './css/ProductionModal.module.css';

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

export const ProductionModal = ({ onClose, item }) => {
  const [openMaterialValueCalcualtor, setOpenMaterialValueCalcualtor] = React.useState(false);
  const [totalTime, setTotalTime] = React.useState(0);
  const { handleSubmit, control, reset, watch, setValue } = useForm({
    defaultValues: {
      partName: item ? item.partName : '',
      quantity: item ? item.quantity : 1,
      status: item ? item.status : '',
      camTime: item ? item.camTime : 0,
      materialValue: item ? item.materialValue : 0,
      toolValue: item ? item.toolValue : 0,
      partType: item ? item.partType : '',
      startUpTime: item ? item.startUpTime : 45,
      finishingTime: item ? item.finishingTime : 30,
      factor: item ? item.factor : 1,
      fixtureTime: item ? item.fixtureTime : 10,
      totalTime: item ? item.totalTime : 0,
      filePDF: undefined
    },
    resolver: yupResolver(productionValidationSchema)
  });

  useEffect(() => {
    const factor = parseFloat(watch('factor'));
    const camTime = parseFloat(watch('camTime'));
    const startUpTime = parseFloat(watch('startUpTime'));
    const finishingTime = parseFloat(watch('finishingTime'));
    const fixtureTime = parseFloat(watch('fixtureTime'));
    const quantity = parseFloat(watch('quantity'));

    const totalTime = factor * (quantity * (camTime + finishingTime + fixtureTime) + startUpTime);

    if (quantity === 0) {
      setTotalTime(0);
      return;
    }

    setTotalTime(Math.round(totalTime));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, watch()]);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleForm = (data) => {
    const formData = new FormData();

    formData.append('partName', data.partName);
    formData.append('quantity', data.quantity);
    formData.append('status', data.status);
    formData.append('camTime', data.camTime);
    formData.append('materialValue', data.materialValue);
    formData.append('toolValue', data.toolValue);
    formData.append('partType', data.partType);
    formData.append('startUpTime', data.startUpTime);
    formData.append('finishingTime', data.finishingTime);
    formData.append('factor', data.factor);
    formData.append('fixtureTime', data.fixtureTime);
    formData.append('totalTime', data.totalTime);

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
            <Stack spacing={2}>
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
              <Divider />
              <Stack spacing={2} direction="row">
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
                  name="factor"
                  control={control}
                  render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                    <Input
                      error={error}
                      placeholder="1.2"
                      onBlur={onBlur}
                      value={value}
                      onChange={onChange}
                      label="Factor"
                      InputProps={{
                        endAdornment: <InputAdornment position="end">x</InputAdornment>
                      }}
                    />
                  )}
                />
              </Stack>
              <Divider />
              <Stack spacing={2} direction="row">
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
                    />
                  )}
                />
                <Controller
                  name="finishingTime"
                  control={control}
                  render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                    <Input
                      error={error}
                      placeholder="200"
                      onBlur={onBlur}
                      value={value}
                      onChange={onChange}
                      label="Finishing time"
                      InputProps={{
                        endAdornment: <InputAdornment position="end">min</InputAdornment>
                      }}
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
                    />
                  )}
                />
              </Stack>
              <Divider />
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
                  />
                )}
              />

              <Divider />
              <Stack spacing={2} className={styles.login_content} direction="row">
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
                <Tooltip title="Calculate material value" placement="top" arrow>
                  <CalculateOutlinedIcon
                    color="action"
                    className={styles.calcualteIcon}
                    onClick={() => {
                      setOpenMaterialValueCalcualtor(true);
                    }}
                  />
                </Tooltip>
                {openMaterialValueCalcualtor && (
                  <MaterialValueCalculator
                    onClose={() => {
                      setOpenMaterialValueCalcualtor(false);
                    }}
                    setMaterialValue={(value) => {
                      setValue('materialValue', value);
                    }}
                  />
                )}
                <Controller
                  name="toolValue"
                  control={control}
                  render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                    <Input
                      error={error}
                      placeholder="200"
                      onBlur={onBlur}
                      value={value}
                      onChange={onChange}
                      label="Tool value"
                      InputProps={{
                        endAdornment: <InputAdornment position="end">PLN</InputAdornment>
                      }}
                    />
                  )}
                />
                <Input
                  placeholder="200"
                  value={totalTime}
                  disabled
                  label="Total time"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">min</InputAdornment>
                  }}
                />
              </Stack>
              <Divider />
              <Controller
                name="partType"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <div>
                    <Tooltip title="Choose production type" placement="top">
                      <ToggleButtonGroup
                        fullWidth
                        className={error ? styles.error_border : ''}
                        color="primary"
                        onBlur={onBlur}
                        value={value}
                        onChange={onChange}
                        aria-label="Platform"
                      >
                        <ToggleButton value="plate">Plate</ToggleButton>
                        <ToggleButton value="part" color="secondary">
                          Part
                        </ToggleButton>
                        <ToggleButton value="modification" color="info">
                          Modification
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Tooltip>
                    <p className={styles.error_message}>{error ? error.message : ''}</p>
                  </div>
                )}
              />
              <Divider />
              <Controller
                name="status"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <div>
                    <Tooltip title="Choose production status" placement="top">
                      <ToggleButtonGroup
                        fullWidth
                        className={error ? styles.error_border : ''}
                        color="primary"
                        onBlur={onBlur}
                        value={value}
                        onChange={onChange}
                        aria-label="Platform"
                      >
                        <ToggleButton value="inprogress" color="warning">
                          IN PROGRESS
                        </ToggleButton>
                        <ToggleButton value="done" color="success">
                          DONE
                        </ToggleButton>
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
