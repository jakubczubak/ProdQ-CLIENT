// Zewnętrzne importy
import {
  SpeedDial,
  Breadcrumbs,
  Typography,
  TextField,
  Tooltip,
  InputAdornment
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { SpeedDialIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

// Lokalne importy
import styles from './css/productionQueue.module.css';

export const ProductionQueue = () => {
    const [isOpen, setIsOpen] = useState(); // open the modal for material group
    const [query, setQuery] = useState(''); // query for search
    return (
      <>
        <Breadcrumbs aria-label="breadcrumb" separator={<Typography color="text.primary">/</Typography>}>
          <Typography color="text.primary">
              <Link to="/dashboard" className={styles.link}>
                ...
              </Link>
          </Typography>
          <Typography color="text.primary">Production</Typography>
        </Breadcrumbs>
        <div className={styles.header}>
          <Typography variant="h5" component="div">
            Production Manager
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
          />
        </Tooltip>
        <div className={styles.production_container}>

        </div>
          <Tooltip title="Add new NC Program" placement="left">
            <SpeedDial
              icon={<SpeedDialIcon openIcon={<EditIcon />} />}
              ariaLabel="Add new NC program"
              sx={speedDialStyles}
              onClick={() => setIsOpen(true)}
            />
          </Tooltip>
      </>
    );
  };

  const speedDialStyles = {
    position: 'fixed',
    bottom: 16,
    right: 16,
    zIndex: 1000
  };
