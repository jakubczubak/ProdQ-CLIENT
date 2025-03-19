// Zewnętrzne importy
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Breadcrumbs, Typography, TextField, InputAdornment, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

// Lokalne importy
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';
import { ProductionTable } from './ProductionTable';
import { ProductionModal } from './ProductionModal';
import { productionManager } from './service/productionManager';
import styles from './css/Production.module.css';

const speedDialStyles = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  zIndex: 1
};

export const Production = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { data, isLoading, isError } = useQuery(
    ['production'],
    productionManager.getProductionItems
  );

  // Funkcja sortująca dane na podstawie właściwości 'createdOn'
  const sortByCreatedOn = (items) => {
    return items.slice().sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
  };

  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}>
        <Typography color="text.primary">...</Typography>
        <Typography color="text.primary">Production</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Production
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
      <SpeedDial
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        ariaLabel="Navigation speed dial"
        sx={{
          ...speedDialStyles,
          '& .MuiSpeedDial-fab': {
            background: 'linear-gradient(90deg, #4a90e2 0%, #63b3ed 100%)',
            '&:hover': { background: 'linear-gradient(90deg, #357abd 0%, #4a90e2 100%)' }
          }
        }}>
        <SpeedDialAction
          icon={<AddIcon />}
          tooltipTitle="Create production item"
          onClick={() => setOpen(true)}
        />
      </SpeedDial>
      {isLoading && <Loader />}
      {isError && (
        <Error message={'Failed to fetch production item list. Please try again later!'} />
      )}
      {data && (
        <ProductionTable
          items={sortByCreatedOn(data).filter((item) => {
            if (query === '') return item;
            else if (item.partName.toLowerCase().includes(query.toLowerCase())) return item;
          })}
        />
      )}
      {open && <ProductionModal onClose={() => setOpen(false)} />}
    </>
  );
};
