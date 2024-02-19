import React from 'react';
import { TextField, Tooltip, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from './css/Calculations.module.css';

export const SearchBar = ({ setQuery }) => (
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
);
