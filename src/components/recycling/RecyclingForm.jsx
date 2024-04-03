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

// Importy lokalne
import styles from './css/RecycleItem.module.css';
import 'dayjs/locale/pl';
import { WasteList } from './WasteList';

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
                <Tooltip title="Select type of waste">
                  <Select
                    width="325px"
                    onBlur={onBlur}
                    value={value}
                    variant="outlined"
                    onChange={onChange}
                    defaultValue={'production_waste'}
                    sx={{ textAlign: 'left', width: '325px' }}
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
                width="325px"
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
                width="325px"
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
                width="325px"
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
                width="325px"
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
                sx={{ width: '325px' }}
              />
            )}
          />
          <Controller
            name="filePDF"
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
              <MuiFileInputStyled
                label="Upload invoice .pdf file (optional)"
                type="file"
                clearIconButtonProps={{
                  title: 'Remove',
                  children: <CloseIcon fontSize="small" />
                }}
                sx={{ width: '325px' }}
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
        </div>
        <div className={styles.date}>
          <Controller
            name="date"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DateCalendar value={value} onChange={onChange} />
            )}
          />
        </div>
        <div className={styles.waste_form}>
          <TextField
            width="325px"
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
            width="325px"
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
            width="325px"
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
            width="325px"
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
      <Button
        variant="contained"
        size="large"
        type="submit"
        endIcon={<RecyclingOutlinedIcon />}>
        Recycle
      </Button>
    </form>
  );
};
