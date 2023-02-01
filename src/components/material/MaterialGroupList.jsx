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
import styles from './css/MaterialGroupList.module.css';
import { useQuery } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import EditIcon from '@mui/icons-material/Edit';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { MaterialGroupModal_ADD } from './MaterialGroupModal_ADD';
import { materialManager } from './service/materialManager';
import { Result } from './Result';

export const MaterialGroupList = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isError } = useQuery(['materials'], materialManager.fetchMaterials);

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
      <div className={styles.material_container}>
        {isLoading && (
          <Box className={styles.loading_container}>
            <CircularProgress />
          </Box>
        )}
        {isError && (
          <Box className={styles.error_container}>
            <ErrorOutlineIcon fontSize="large" color="error" />
            {'Failed to fetch materials, please try again later.'}
          </Box>
        )}
        {!isError && !isLoading && <Result data={data.length ? data : []} query={query} />}
      </div>
      <SpeedDial
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        ariaLabel="Navigation speed dial"
        sx={speedDialStyles}>
        <SpeedDialAction icon={<AddIcon />} tooltipTitle="Create" onClick={() => setIsOpen(true)} />
      </SpeedDial>
      <MaterialGroupModal_ADD open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

const speedDialStyles = {
  position: 'fixed',
  bottom: 16,
  right: 16
};
