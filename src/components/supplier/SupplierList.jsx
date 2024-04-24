// Importy zewnętrzne
import React from 'react';
import { Typography, TextField, InputAdornment, Tooltip, Breadcrumbs } from '@mui/material';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
// Importy lokalne
import styles from './css/SupplierList.module.css';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supplierManager } from './service/supplierManager';
import { SupplierItem } from './SupplierItem';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';
import animation from '../../assets/Lottie/no-data.json';

const speedDialStyles = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  zIndex: 1
};

export const SupplierList = () => {
  const [query, setQuery] = React.useState('');
  const { data, isLoading, isError } = useQuery(['suppliers'], supplierManager.getSupplierList); // fetch all supliers

  const navigate = useNavigate();

  const filteredSuppliers = (item) => {
    if (query === '') {
      return item;
    }
    if (
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.surname.toLowerCase().includes(query.toLowerCase()) ||
      item.companyName.toLowerCase().includes(query.toLowerCase()) ||
      item.tagList.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
    ) {
      return item;
    }
  };

  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}
      >
        <Typography color="text.primary">
          <Link to="/dashboard" className={styles.link}>
            ...
          </Link>
        </Typography>
        <Typography color="text.primary">Network</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Contact network
        </Typography>
      </div>
      <Tooltip title="Search" placement="right">
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
        ></TextField>
      </Tooltip>
      <Tooltip title="Add supplier" placement="right">
        <SpeedDial
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
          ariaLabel="Navigation speed dial"
          sx={speedDialStyles}
          onClick={() => navigate('/supplier/new')}
        ></SpeedDial>
      </Tooltip>
      {isLoading && <Loader />}
      {isError && <Error message={'Failed to fetch supplier list. Please try again later!'} />}
      {data && (
        <div className={styles.supplierList}>
          {data.length > 0 ? (
            data
              .sort((a, b) => a.name.localeCompare(b.name))
              .filter(filteredSuppliers)
              .map((item) => {
                return <SupplierItem key={item.id} item={item} />;
              })
          ) : (
            <div>
              <Lottie animationData={animation} loop={true} className={styles.animation} />
            </div>
          )}
        </div>
      )}
    </>
  );
};
