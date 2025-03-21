//Importy zewnętrzne
import {
  SpeedDial,
  SpeedDialIcon,
  Breadcrumbs,
  Typography,
  TextField,
  Tooltip,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
//Importy lokalne
import styles from './css/AccessorieGroupList.module.css';
import { accessorieManager } from './service/AccessorieManager';
import EditIcon from '@mui/icons-material/Edit';
import { Result } from './Result';
import { AccessorieGroupModal } from './AccessorieGroupModal';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';

const speedDialStyles = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  zIndex: 1
};

export const AccessorieGroupList = ({ open }) => {
  const [query, setQuery] = useState(''); // query for search
  const [isOpen, setIsOpen] = useState(open); // open the modal
  const { data, isLoading, isError } = useQuery(['accessories'], () =>
    accessorieManager.getAccessories()
  ); // fetch all accessories
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
        <Typography color="text.primary">Accessories</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Accessory Manager
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
                <SearchIcon sx={{ color: '#4a90e2' }} />
              </InputAdornment>
            )
          }}></TextField>
      </Tooltip>
      <div className={styles.accessorie_container}>
        {isLoading && <Loader />}
        {isError && <Error message={'Failed to fetch accessorie list. Please try again later!'} />}
        {!isError && !isLoading && <Result data={data.length ? data : []} query={query} />}
      </div>
      <Tooltip
        PopperProps={{ disablePortal: true }}
        title="Add new accessorie group"
        placement="left">
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
          onClick={() => setIsOpen(true)}></SpeedDial>
      </Tooltip>
      <AccessorieGroupModal open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
