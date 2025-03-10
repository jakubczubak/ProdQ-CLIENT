// Importy zewnętrzne
import React from 'react';
import { Button, Tooltip, MenuItem, Select, InputAdornment, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { Input } from '../common/Input';
import { DateCalendar, TimePicker } from '@mui/x-date-pickers';
import RecyclingOutlinedIcon from '@mui/icons-material/RecyclingOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import { MuiFileInput } from 'mui-file-input';
import styled from 'styled-components';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import DescriptionIcon from '@mui/icons-material/Description';
import { useNavigate } from 'react-router-dom';

// Importy lokalne
import styles from './css/RecycleItem.module.css';
import 'dayjs/locale/pl';
import { WasteList } from './WasteList';
import { recycleManager } from './service/recycleManager';
import { savePDF } from '../common/service/savePDF';

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

export const RecyclingForm = ({
  control,
  handleSubmit,
  onSubmit,
  recyclingItems,
  errorName,
  errorQuantity,
  errorPrice,
  wasteName,
  setWasteName,
  wasteQuantity,
  setWasteQuantity,
  wastePrice,
  setWastePrice,
  wasteValue,
  setWasteValue,
  setErrorQuantity,
  setErrorPrice,
  handleAddWaste,
  setRecyclingItems,
  state
}) => {
  const [filePDF, setFilePDF] = useState(undefined);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setFilePDF(e);
    const data = new FormData();
    data.append('filePDF', e);
    data.append('id', state.id);
    recycleManager.uploadPDFFile(data, queryClient, dispatch);
  };

  const handlePDFFile = () => {
    setFilePDF(undefined);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <p className={styles.title}>Waste transfer form</p>
      <div className={styles.data_container}>
        <div className={styles.inputs}>
          <Controller
            name="wasteType"
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
              <>
                <Tooltip PopperProps={{ disablePortal: true }} title="Select type of waste">
                  <Select
                    onBlur={onBlur}
                    value={value}
                    variant="outlined"
                    onChange={onChange}
                    defaultValue={'production_waste'}
                    sx={{ textAlign: 'left', width: '260px' }}
                    error={!!error}>
                    <MenuItem value={'Recyclable waste'}>
                      Recyclable waste (aluminum, steel, chips, etc.)
                    </MenuItem>
                    <MenuItem value={'Non-recyclable waste'}>
                      Non-recyclable waste (coolant, oils, etc.)
                    </MenuItem>
                  </Select>
                </Tooltip>
              </>
            )}
          />
          <Controller
            name="wasteCode"
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
              <Input
                width="260px"
                error={error}
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                variant="outlined"
                label="Waste code"
              />
            )}
          />
          <Controller
            name="company"
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
              <Input
                width="260px"
                error={error}
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                variant="outlined"
                label="Company name"
              />
            )}
          />
          <Controller
            name="taxID"
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
              <Input
                width="260px"
                error={error}
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                variant="outlined"
                label="Tax identification number"
              />
            )}
          />

          <Controller
            name="carID"
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
              <Input
                width="260px"
                error={error}
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                variant="outlined"
                label="Car ID"
              />
            )}
          />
          <Controller
            name="time"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TimePicker
                label="Time"
                value={value}
                onChange={onChange}
                variant="filled"
                sx={{ width: '260px' }}
              />
            )}
          />
          {state ? (
            state.filePDF ? (
              <div>
                <div>
                  <Button
                    variant="outlined"
                    startIcon={<DescriptionIcon />}
                    sx={{ width: '260px' }}
                    onClick={() => savePDF(state)}>
                    DOWNLOAD INVOICE
                  </Button>
                </div>
                <div>
                  <Button
                    variant="text"
                    color="error"
                    sx={{ width: '260px', marginTop: '10px' }}
                    onClick={() => {
                      recycleManager.deletePDFFile(state.id, queryClient, dispatch, handlePDFFile);
                      const newState = { ...state, filePDF: null };
                      navigate('/recycling/wtc/', { state: newState });
                    }}>
                    REMOVE INVOICE
                  </Button>
                </div>
              </div>
            ) : (
              <MuiFileInputStyled
                label="Upload invoice .pdf file (optional)"
                type="file"
                clearIconButtonProps={{
                  title: 'Remove',
                  children: <CloseIcon fontSize="small" />,
                  onClick: () => {
                    const id = state.id;
                    recycleManager.deletePDFFile(id, queryClient, dispatch, handlePDFFile);
                  }
                }}
                sx={{ width: '260px' }}
                onChange={handleFileChange} // Przekazanie funkcji do obsługi zmiany pliku
                value={filePDF}
                InputProps={{
                  inputProps: {
                    accept: '.pdf'
                  },
                  startAdornment: <AttachFileIcon />
                }}
              />
            )
          ) : null}
        </div>
        <div className={styles.date}>
          <Controller
            name="date"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DateCalendar value={value} onChange={onChange} sx={{ width: '260px' }} />
            )}
          />
        </div>
        <div className={styles.waste_form}>
          <TextField
            width="260px"
            label="Waste name"
            variant="outlined"
            value={wasteName}
            error={errorName}
            helperText={errorName ? 'Waste name is required' : ''}
            onChange={(e) => {
              setWasteName(e.target.value);
            }}
          />
          <TextField
            width="260px"
            label="Quantity"
            variant="outlined"
            error={errorQuantity}
            helperText={errorQuantity ? 'Quantity must be a number and greater than 0' : ''}
            value={wasteQuantity}
            onChange={(e) => {
              const quantity = e.target.value;
              if (isNaN(quantity) || quantity < 0) {
                setErrorQuantity(true);
              } else {
                setErrorQuantity(false);
                setWasteQuantity(quantity);
                setWasteValue((quantity * wastePrice).toFixed(2));
              }
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">kg</InputAdornment>
            }}
          />
          <TextField
            label="Price"
            variant="outlined"
            error={errorPrice}
            helperText={errorPrice ? 'Price must be a number and greater than 0' : ''}
            value={wastePrice}
            width="260px"
            onChange={(e) => {
              const price = e.target.value;
              if (isNaN(price) || price < 0) {
                setErrorPrice(true);
              } else {
                setErrorPrice(false);
                setWastePrice(price);
                setWasteValue((wasteQuantity * price).toFixed(2));
              }
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">PLN(net)/kg</InputAdornment>
            }}
          />
          <TextField
            label="Value"
            variant="outlined"
            disabled
            width="220px"
            value={wasteValue}
            InputProps={{
              endAdornment: <InputAdornment position="end">PLN(net)</InputAdornment>
            }}
          />
          <Button
            variant="text"
            size="large"
            type="button"
            color="primary"
            onClick={handleAddWaste}
            endIcon={<AddOutlinedIcon />}>
            Add waste item
          </Button>
        </div>
      </div>
      <WasteList recyclingItems={recyclingItems} setRecyclingItems={setRecyclingItems} />
      <Button variant="contained" size="large" type="submit" endIcon={<RecyclingOutlinedIcon />}>
        Recycle
      </Button>
    </form>
  );
};
