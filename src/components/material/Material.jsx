import React from 'react';
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Breadcrumbs,
  Typography,
  Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styles from './Material.module.css';
import { MaterialItem } from './MaterialItem';
import { useQuery } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

async function fetchMaterials() {
  const response = await fetch('http://localhost:4000/materials');
  return await response.json();
}

export const Material = () => {
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
        {data.map((item) => (
          <MaterialItem key={item.id} item={item} />
        ))}
      </div>
      <SpeedDial
        ariaLabel="Navigation speed dial"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}>
        <SpeedDialAction icon={<AddIcon />} tooltipTitle="Create" />
      </SpeedDial>
    </>
  );
};
