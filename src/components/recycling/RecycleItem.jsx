// Importy zewnętrzne
import React from 'react';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import Lottie from 'lottie-react';
import 'dayjs/locale/pl';
import { useState } from 'react';

// Importy lokalne
import styles from './css/RecycleItem.module.css';
import { recycleValidationSchema } from './service/validationSchema/recycleValidationSchema';
import { recycleManager } from './service/recycleManager';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import animation from '../../assets/Lottie/recycle.json';
import { Header } from './Header';
import { RecyclingForm } from './RecyclingForm';

export const RecycleItem = () => {
  const { state } = useLocation();
  const [wasteName, setWasteName] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [wasteQuantity, setWasteQuantity] = useState('');
  const [errorQuantity, setErrorQuantity] = useState(false);
  const [wastePrice, setWastePrice] = useState('');
  const [errorPrice, setErrorPrice] = useState(false);
  const [wasteValue, setWasteValue] = useState(0);
  const [recyclingItems, setRecyclingItems] = useState(state ? state.recyclingItems : []);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      recyclingItems: state ? state.recyclingItems : [],
      wasteType: state ? state.wasteType : 'Recyclable waste',
      wasteCode: state ? state.wasteCode : '',
      company: state ? state.company : '',
      taxID: state ? state.taxID : '',
      carID: state ? state.carID : '',
      date: state ? dayjs(state.date, 'DD/MM/YYYY') : dayjs(new Date()),
      time: state ? dayjs(state.time, 'HH:mm') : dayjs(new Date())
    },
    resolver: yupResolver(recycleValidationSchema)
  });

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const localTime = dayjs(data.time).locale('pl').format('HH:mm');
    const localDate = dayjs(data.date).locale('pl').format('DD/MM/YYYY');
    const totalPrice = recyclingItems.reduce((acc, curr) => acc + curr.totalPrice, 0);
    data.time = localTime;
    data.date = localDate;
    data.recyclingItems = recyclingItems;
    data.totalPrice = totalPrice;
    if (state) {
      data.id = state.id;
      recycleManager.updateWTC(data, queryClient, dispatch);
    } else {
      recycleManager.createWTC(data, queryClient, dispatch);
    }
    navigate('/recycling');
  };

  const validateWaste = () => {
    let isValidate = true;

    if (wasteQuantity === '') {
      setErrorQuantity(true);
      isValidate = false;
    } else {
      setErrorQuantity(false);
    }
    if (wasteName === '') {
      setErrorName(true);
      isValidate = false;
    } else {
      setErrorName(false);
    }
    if (wastePrice === '') {
      setErrorPrice(true);
      isValidate = false;
    } else {
      setErrorPrice(false);
    }
    const quantity = parseFloat(wasteQuantity);
    if (isNaN(quantity) || quantity <= 0) {
      setErrorQuantity(true);
      isValidate = false;
    } else {
      setErrorQuantity(false);
    }
    const price = parseFloat(wastePrice);
    if (isNaN(price) || price <= 0) {
      setErrorPrice(true);
      isValidate = false;
    } else {
      setErrorPrice(false);
    }
    return isValidate; // true or false
  };

  const handleAddWaste = () => {
    const isValidate = validateWaste();
    if (isValidate) {
      const wasteValue = wasteQuantity * wastePrice;
      const waste = {
        name: wasteName,
        quantity: wasteQuantity,
        pricePerKg: wastePrice,
        totalPrice: wasteValue
      };
      setRecyclingItems([...recyclingItems, waste]);
      setWasteName('');
      setWasteQuantity('');
      setWastePrice('');
      setWasteValue('');
    }
  };
  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}>
        <Typography color="text.primary">
          <Link to="/dashboard" className={styles.link}>
            ...
          </Link>
        </Typography>
        <Typography color="text.primary">
          <Link to="/recycling" className={styles.link}>
            Recycling
          </Link>
        </Typography>
        <Typography color="text.primary">Waste transfer card</Typography>
      </Breadcrumbs>
      <Header state={state} />
      <div className={styles.wtc_wrapper}>
        <Lottie animationData={animation} loop={true} className={styles.animation} />
        <RecyclingForm
          control={control}
          errorName={errorName}
          errorPrice={errorPrice}
          errorQuantity={errorQuantity}
          handleAddWaste={handleAddWaste}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          recyclingItems={recyclingItems}
          setErrorPrice={setErrorPrice}
          setErrorQuantity={setErrorQuantity}
          setRecyclingItems={setRecyclingItems}
          setWasteName={setWasteName}
          setWastePrice={setWastePrice}
          setWasteQuantity={setWasteQuantity}
          setWasteValue={setWasteValue}
          state={state}
          wasteName={wasteName}
          wastePrice={wastePrice}
          wasteQuantity={wasteQuantity}
          wasteValue={wasteValue}
        />
      </div>
    </>
  );
};
