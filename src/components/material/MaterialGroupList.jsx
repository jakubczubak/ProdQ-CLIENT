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
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchIcon from '@mui/icons-material/Search';
import { SpeedDialIcon } from '@mui/material';
import { Link } from 'react-router-dom';

// Lokalne importy
import styles from './css/MaterialGroupList.module.css';
import { MaterialGroupModal_ADD } from './MaterialGroupModal_ADD';
import { materialManager } from './service/materialManager';
import { Result } from './Result';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';
import { useSelector } from 'react-redux';

export const MaterialGroupList = ({ open }) => {
  const isSelectMode = useSelector((state) => state.mode);
  const [query, setQuery] = useState(''); // query for search
  const [isOpen, setIsOpen] = useState(open); // open the modal for material group
  const { data, isLoading, isError } = useQuery(['material'], materialManager.getMaterialGroups); // fetch all materials

  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}
      >
        <Typography color="text.primary">
          {isSelectMode ? (
            <Link to="" className={styles.link}>
              ...
            </Link>
          ) : (
            <Link to="/dashboard" className={styles.link}>
              ...
            </Link>
          )}
        </Typography>
        <Typography color="text.primary">Materials</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Manage materials
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
      <div className={styles.material_container}>
        {isLoading && <Loader />}
        {isError && <Error message={'Failed to fetch materials, please try again later.'} />}
        {!isError && !isLoading && <Result data={data.length ? data : []} query={query} />}
      </div>
      {!isSelectMode && (
        <Tooltip title="Add new material group" placement="left">
          <SpeedDial
            icon={<SpeedDialIcon openIcon={<EditIcon />} />}
            ariaLabel="Navigation speed dial"
            sx={speedDialStyles}
            onClick={() => setIsOpen(true)}
          ></SpeedDial>
        </Tooltip>
      )}
      <MaterialGroupModal_ADD open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

const speedDialStyles = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  zIndex: 1
};
