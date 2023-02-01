import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from './css/GlobalFilter.module.css'

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <TextField
      variant="standard"
      onChange={(e) => setFilter(e.target.value)}
      label="Search"
      value={filter || ''}
      InputProps={{
        className: styles.search_input,
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        )
      }}></TextField>
  );
};
