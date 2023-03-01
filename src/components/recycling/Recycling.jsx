import React from 'react';
import styles from './css/Recycling.module.css';
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
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/recycle.json';

export const Recycling = () => {
  const [query, setQuery] = React.useState('');

  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}>
        <Typography color="text.primary">...</Typography>
        <Typography color="text.primary">Recycling</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Company recycling
        </Typography>
        <Lottie animationData={animation} loop={true} className={styles.animation} />
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
        <SpeedDialAction icon={<AddIcon />} tooltipTitle="Create" onClick={() => {}} />
      </SpeedDial>
    </>
  );
};

const speedDialStyles = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  zIndex: 1
};
