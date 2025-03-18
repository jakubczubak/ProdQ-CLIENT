// Importy zewnętrzne
import React from 'react';
import {
  Breadcrumbs,
  Typography,
  Tooltip,
  TextField,
  InputAdornment,
  SpeedDialIcon,
  SpeedDial
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
// Importy lokalne
import styles from './css/OrderList.module.css';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';
import { orderManager } from './service/orderManager';
import { OrderTable } from './OrderTable';

const speedDialStyles = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  zIndex: 1
};

// Funkcja parsująca datę w formacie DD/MM/YYYY
const parseCustomDate = (dateStr) => {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day); // month jest 0-based w JavaScript
};

export const OrderList = () => {
  const [query, setQuery] = useState('');
  const { data, isLoading, isError } = useQuery(['order'], orderManager.getOrderList);
  const navigate = useNavigate();

  // Sortowanie po dacie - od najnowszej do najstarszej
  const sortedOrders = data
    ? [...data]
        .sort((a, b) => {
          const dateA = parseCustomDate(a.date);
          const dateB = parseCustomDate(b.date);
          return dateB - dateA; // Od najnowszej do najstarszej
        })
        .filter((order) => {
          if (query === '') return true;
          return order.name.toLowerCase().includes(query.toLowerCase());
        })
    : [];

  return (
    <div className={styles.orderList}>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}>
        <Typography color="text.primary">
          <Link to="/dashboard" className={styles.link}>
            ...
          </Link>
        </Typography>
        <Typography color="text.primary">Orders</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Order Manager
        </Typography>
      </div>
      <Tooltip PopperProps={{ disablePortal: true }} title="Search" placement="right">
        <TextField
          variant="standard"
          onChange={(e) => setQuery(e.target.value)}
          label="Search"
          InputProps={{
            className: styles.search_input,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </Tooltip>
      <Tooltip PopperProps={{ disablePortal: true }} title="Add order" placement="right">
        <SpeedDial
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
          ariaLabel="Navigation speed dial"
          sx={{
            ...speedDialStyles,
            '& .MuiSpeedDial-fab': {
              background: 'linear-gradient(90deg, #4a90e2 0%, #63b3ed 100%)',
              '&:hover': { background: 'linear-gradient(90deg, #357abd 0%, #4a90e2 100%)' }
            }
          }}
          onClick={() => navigate('/order/new')}
        />
      </Tooltip>
      {isLoading && <Loader />}
      {isError && <Error message={'Failed to fetch orders. Please try again later!'} />}
      {data && <OrderTable orderList={sortedOrders} />}
    </div>
  );
};
