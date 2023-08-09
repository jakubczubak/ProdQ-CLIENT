import React from 'react';
import styles from './css/RecycleItem.module.css';
import { Breadcrumbs, Typography, Button, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '../common/Input';
import { DateCalendar } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers';
import { yupResolver } from '@hookform/resolvers/yup';
import { recycleValidationSchema } from './service/validationSchema/recycleValidationSchema';
import { recycleManager } from './service/recycleManager';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/eco_v4.json';
import RecyclingOutlinedIcon from '@mui/icons-material/RecyclingOutlined';
import { MenuItem, Select } from '@mui/material';
import 'dayjs/locale/pl';

export const RecycleItem = () => {
  const { state } = useLocation();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      receiver: state ? state.receiver : '',
      carID: state ? state.carID : '',
      type: state ? state.type : '',
      date: state ? dayjs(state.date, 'DD/MM/YYYY') : dayjs(new Date()),
      time: state ? dayjs(new Date().toISOString().slice(0, 10) + 'T14:42') : dayjs(new Date())
    },
    resolver: yupResolver(recycleValidationSchema)
  });

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const localTime = dayjs(data.time).locale('pl').format('HH:mm');
    const localDate = dayjs(data.date).locale('pl').format('DD/MM/YYYY');

    data.time = localTime;
    data.date = localDate;

    const value = data.wasteList.reduce((acc, curr) => acc + curr.wasteValue, 0);

    data.value = value;

    if (state) {
      data.id = state.id;
      recycleManager.updateWTC(data, queryClient, dispatch);
    } else {
      recycleManager.createWTC(data, queryClient, dispatch);
    }

    navigate('/recycling');
  };

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
        <Typography color="text.primary">Waste transfer card</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          {state ? 'Update waste transfer card' : 'Waste transfer card'}
        </Typography>
      </div>

      <div className={styles.wtc_wrapper}>
        <Lottie animationData={animation} loop={true} className={styles.animation} />

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <p className={styles.title}>Waste management (BDO)</p>

          <div className={styles.data_container}>
            <div className={styles.inputs}>
              <Controller
                name="status"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <>
                    <Tooltip title="Select type of waste">
                      <Select
                        onBlur={onBlur}
                        value={value}
                        variant="outlined"
                        onChange={onChange}
                        defaultValue={'production_waste'}
                        sx={{ textAlign: 'left', width: '325px' }}
                        error={!!error}>
                        <MenuItem value={'production_waste'}>
                          Recyclable waste (aluminum, steel, chips, etc.)
                        </MenuItem>
                        <MenuItem value={'disposal_service'}>
                          Non-recyclable waste (coolant, oils, etc.)
                        </MenuItem>
                      </Select>
                    </Tooltip>
                  </>
                )}
              />
              <Controller
                name="wase_code"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
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
                name="receiver"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
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
                name="receiver"
                control={control}
                render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                  <Input
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
                    views={['hours', 'minutes']}
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
          </div>

          <Button
            variant="contained"
            size="large"
            type="submit"
            color={state ? 'primary' : 'success'}
            endIcon={<RecyclingOutlinedIcon />}>
            Recycle
          </Button>
        </form>
      </div>
    </>
  );
};
