import React from 'react';
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Breadcrumbs,
  Typography,
  Box,
  TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styles from './Material.module.css';
import { MaterialItem } from './MaterialItem';
import { useQuery } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import EditIcon from '@mui/icons-material/Edit';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { CreateMaterialGroupModal } from './CreateMaterialGroupModal';


async function fetchMaterials() {
  const response = await fetch('http://localhost:4000/materials');
  return await response.json();
}

export const Material = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isError } = useQuery(['materilas'], fetchMaterials, {
    placeholderData: []
  });

  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}>
        <Typography color="text.primary">...</Typography>
        <Typography color="text.primary">Materials</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Manage Materials
        </Typography>
      </div>
      <TextField
        onChange={(e) => setQuery(e.target.value)}
        label="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
        variant="standard"
        sx={{ marginBottom: '30px' }}></TextField>
      <div className={styles.material_container}>
        {isLoading && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}>
            <CircularProgress />
          </Box>
        )}
        {isError && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}>
            <ErrorOutlineIcon fontSize="large" color="error" />
          </Box>
        )}
        {data
          .filter((item) => {
            if (query === '') {
              return item;
            } else if (
              item.name.toLowerCase().includes(query.toLowerCase()) ||
              item.type.toLowerCase().includes(query.toLowerCase())
            ) {
              return item;
            }
          })
          .map((item) => (
            <MaterialItem key={item.id} item={item} />
          ))}
      </div>
      <SpeedDial
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        ariaLabel="Navigation speed dial"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <SpeedDialAction icon={<AddIcon />} tooltipTitle="Create" onClick={() => setIsOpen(true)} />
      </SpeedDial>
      <CreateMaterialGroupModal open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
