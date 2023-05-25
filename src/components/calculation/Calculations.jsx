import React from 'react';
import styles from './css/Calculations.module.css';
import {
  Typography,
  TextField,
  Tooltip,
  InputAdornment,
  Breadcrumbs,
  SpeedDialIcon,
  SpeedDial,
  SpeedDialAction
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculationManager } from './service/calculationManager';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';
import { useQuery } from '@tanstack/react-query';

export const Calculations = () => {
  const [query, setQuery] = useState(''); // query for search
  const { data, isLoading, isError } = useQuery(
    ['calculation'],
    calculationManager.getCalculationList
  ); // fetch all calcualiions

  const navigate = useNavigate();

  return (
    <div>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}>
        <Typography color="text.primary">...</Typography>
        <Typography color="text.primary">Calculations</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Manage Calculations
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
          }}></TextField>
      </Tooltip>
      <SpeedDial
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        ariaLabel="Navigation speed dial"
        sx={speedDialStyles}>
        <SpeedDialAction
          icon={<AddIcon />}
          tooltipTitle="Create"
          onClick={() => navigate('/calculation/new')}
        />
      </SpeedDial>
      {isLoading && <Loader />}
      {isError && <Error message={'Failed to fetch calculations. Please try again later!'} />}
    </div>
  );
};

const speedDialStyles = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  zIndex: 1
};
