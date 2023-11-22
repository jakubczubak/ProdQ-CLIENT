import React from 'react';
import styles from './css/RecycleList.module.css';
import {
  Breadcrumbs,
  Typography,
  TextField,
  InputAdornment,
  Tooltip,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { WTCList } from './WTCList';
import { useQuery } from '@tanstack/react-query';
import { recycleManager } from './service/recycleManager';
import { useState } from 'react';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';

export const RecycleList = () => {
  const [query, setQuery] = useState('');
  const { data, isLoading, isError } = useQuery(['recycle'], recycleManager.getRecycleList); // fetch all recycling materials

  let navigate = useNavigate();
  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}
      >
        <Typography color="text.primary">...</Typography>
        <Typography color="text.primary">Recycling</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Recycling
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

      <SpeedDial
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        ariaLabel="Navigation speed dial"
        sx={speedDialStyles}
      >
        <SpeedDialAction
          icon={<AddIcon />}
          tooltipTitle="WTC Form"
          onClick={() => navigate('/recycling/wtc')}
        />
      </SpeedDial>
      {isLoading && <Loader />}
      {isError && (
        <Error message={'Failed to fetch waste transfer cards. Please try again later!'} />
      )}
      {data && (
        <WTCList
          item={data.filter((item) => {
            if (query === '') {
              return item;
            } else if (
              item.company.toLowerCase().includes(query.toLowerCase()) ||
              item.totalPrice.toString().toLowerCase().includes(query.toLowerCase()) ||
              item.date.toLowerCase().includes(query.toLowerCase())
            ) {
              return item;
            }
          })}
        />
      )}
    </>
  );
};

const speedDialStyles = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  zIndex: 1
};
