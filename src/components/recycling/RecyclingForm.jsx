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
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
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
      <p className={styles.title}>Waste Transfer Form</p>
      <div className={styles.data_container}>
        <div className={styles.inputs}>
          <Controller
            name="wasteType"
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
              <Tooltip PopperProps={{ disablePortal: true }} title="Select type of waste">
                <Select
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  defaultValue={'Recyclable waste'}
                  sx={{
                    width: '300px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: error ? '#ff4d4f' : 'rgba(0, 0, 0, 0.1)',
                    },
                  }}
                  error={!!error}
                >
                  <MenuItem value={'Recyclable waste'}>Recyclable waste (aluminum, steel, etc.)</MenuItem>
                  <MenuItem value={'Non-recyclable waste'}>Non-recyclable waste (coolant, oils, etc.)</MenuItem>
                </Select>
              </Tooltip>
            )}
          />
          <Controller
            name="wasteCode"
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
              <Input
                width="300px"
                error={error}
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                variant="outlined"
                label="Waste code"
                sx={{
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                }}
              />
            )}
          />
          <Controller
            name="company"
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
              <Input
                width="300px"
                error={error}
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                variant="outlined"
                label="Company name"
                sx={{
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                }}
              />
            )}
          />
          <Controller
            name="taxID"
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
              <Input
                width="300px"
                error={error}
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                variant="outlined"
                label="Tax identification number"
                sx={{
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                }}
              />
            )}
          />
          <Controller
            name="carID"
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
              <Input
                width="300px"
                error={error}
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                variant="outlined"
                label="Car ID"
                sx={{
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                }}
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
                sx={{
                  width: '300px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                  },
                }}
              />
            )}
          />
          {state ? (
            state.filePDF ? (
              <div>
                <Button
                  variant="outlined"
                  startIcon={<DescriptionIcon />}
                  sx={{
                    width: '300px',
                    borderRadius: '10px',
                    borderColor: '#4a90e2',
                    color: '#4a90e2',
                    textTransform: 'none',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#357abd',
                      color: '#357abd',
                      background: 'rgba(74, 144, 226, 0.1)',
                    },
                  }}
                  onClick={() => savePDF(state)}
                >
                  Download Invoice
                </Button>
                <Button
                  variant="text"
                  color="error"
                  sx={{
                    width: '300px',
                    marginTop: '10px',
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                  onClick={() => {
                    recycleManager.deletePDFFile(state.id, queryClient, dispatch, handlePDFFile);
                    const newState = { ...state, filePDF: null };
                    navigate('/recycling/wtc/', { state: newState });
                  }}
                >
                  Remove Invoice
                </Button>
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
                sx={{ width: '300px' }}
                onChange={handleFileChange}
                value={filePDF}
                InputProps={{
                  inputProps: { accept: '.pdf' },
                  startAdornment: <AttachFileIcon />,
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
              <DateCalendar
                value={value}
                onChange={onChange}
                sx={{
                  width: '300px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '10px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              />
            )}
          />
        </div>
        <div className={styles.waste_form}>
          <TextField
            label="Waste name"
            variant="outlined"
            value={wasteName}
            error={errorName}
            helperText={errorName ? 'Waste name is required' : ''}
            onChange={(e) => setWasteName(e.target.value)}
            sx={{
              width: '100%',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: errorName ? '#ff4d4f' : 'rgba(0, 0, 0, 0.1)',
              },
            }}
          />
          <TextField
            label="Quantity"
            variant="outlined"
            error={errorQuantity}
            helperText={errorQuantity ? 'Quantity must be a number > 0' : ''}
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
              endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            }}
            sx={{
              width: '100%',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: errorQuantity ? '#ff4d4f' : 'rgba(0, 0, 0, 0.1)',
              },
            }}
          />
          <TextField
            label="Price"
            variant="outlined"
            error={errorPrice}
            helperText={errorPrice ? 'Price must be a number > 0' : ''}
            value={wastePrice}
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
              endAdornment: <InputAdornment position="end">PLN(net)/kg</InputAdornment>,
            }}
            sx={{
              width: '100%',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: errorPrice ? '#ff4d4f' : 'rgba(0, 0, 0, 0.1)',
              },
            }}
          />
          <TextField
            label="Value"
            variant="outlined"
            disabled
            value={wasteValue}
            InputProps={{
              endAdornment: <InputAdornment position="end">PLN(net)</InputAdornment>,
            }}
            sx={{
              width: '100%',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0, 0, 0, 0.1)' },
            }}
          />
          <Button
            variant="outlined"
            size="large"
            type="button"
            onClick={handleAddWaste}
            endIcon={<AddOutlinedIcon />}
            sx={{
              width: '100%',
              borderRadius: '10px',
              borderColor: '#4a90e2',
              color: '#4a90e2',
              textTransform: 'none',
              fontWeight: 600,
              padding: '10px',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: '#357abd',
                color: '#357abd',
                background: 'rgba(74, 144, 226, 0.1)',
              },
            }}
          >
            Add Waste Item
          </Button>
        </div>
      </div>
      <WasteList recyclingItems={recyclingItems} setRecyclingItems={setRecyclingItems} />
      <Button
        variant="contained"
        size="large"
        type="submit"
        endIcon={<RecyclingOutlinedIcon />}
        sx={{
          marginTop: '30px',
          background: 'linear-gradient(90deg, #4a90e2 0%, #63b3ed 100%)',
          borderRadius: '10px',
          padding: '12px 24px',
          width: '300px',
          textTransform: 'none',
          fontWeight: 'bold',
          fontSize: '16px',
          boxShadow: '0 4px 12px rgba(74, 144, 226, 0.3)',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'linear-gradient(90deg, #357abd 0%, #4a90e2 100%)',
            boxShadow: '0 6px 16px rgba(74, 144, 226, 0.5)',
            transform: 'translateY(-2px)',
          },
          color: '#fff',
        }}
      >
        Recycle
      </Button>
    </form>
  );
};