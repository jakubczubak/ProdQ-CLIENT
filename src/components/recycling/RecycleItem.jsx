import React from 'react';
import styles from './css/RecycleItem.module.css';
import {
  Breadcrumbs,
  Typography,
  Button,
  TextField,
  IconButton,
  InputAdornment
} from '@mui/material';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/recycle_v2.json';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '../common/Input';
import { DateCalendar } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from 'react';

export const RecycleItem = () => {
  const [wasteName, setWasteName] = useState('');
  const [wasteQuantity, setWasteQuantity] = useState('');
  const [wasteValue, setWasteValue] = useState('');

  const { handleSubmit, control } = useForm({
    defaultValues: {
      receiver: '',
      carID: '',
      date: dayjs(new Date()),
      time: dayjs(new Date())
    }
  });

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}>
        <Typography color="text.primary">...</Typography>

        <Typography color="text.primary">
          <Link to="/recycling" className={styles.link}>
            Recycling
          </Link>
        </Typography>
        <Typography color="text.primary">WTC</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Waste transfer card
        </Typography>
        <Lottie animationData={animation} loop={true} className={styles.animation} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.data_container}>
          <div className={styles.inputs}>
            <Controller
              name="receiver"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder="OneBrand"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Receiver"
                />
              )}
            />
            <Controller
              name="carID"
              control={control}
              render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                <Input
                  error={error}
                  placeholder="WWY 21333"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  label="Car ID"
                />
              )}
            />
            <Controller
              name="time"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TimePicker label="Time" value={value} onChange={onChange} width />
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
        </div>
        <Typography color="success" gutterBottom variant="overline">
          Waste list:
        </Typography>
        <div className={styles.waste_form}>
          <TextField
            label="Waste name"
            className={styles.item}
            value={wasteName}
            onChange={(e) => {
              setWasteName(e.target.value);
            }}
          />
          <TextField
            label="Quantity"
            InputProps={{
              endAdornment: <InputAdornment position="end">kg</InputAdornment>
            }}
            style={{ width: '150px' }}
            className={styles.item}
            value={wasteQuantity}
            onChange={(e) => {
              setWasteQuantity(e.target.value);
            }}
          />
          <TextField
            label="Value"
            InputProps={{
              endAdornment: <InputAdornment position="end">PLN</InputAdornment>
            }}
            style={{ width: '150px' }}
            className={styles.item}
            value={wasteValue}
            onChange={(e) => {
              setWasteValue(e.target.value);
            }}
          />
          <IconButton className={styles.item}>
            <AddCircleIcon color="info" />
          </IconButton>
        </div>

        <Button variant="contained" size="large" type="submit" color="success">
          Recycle
        </Button>
      </form>
    </>
  );
};
