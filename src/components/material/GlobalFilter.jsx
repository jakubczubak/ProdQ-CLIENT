import { TextField, InputAdornment, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <Tooltip title="Search" placement="right">
      <TextField
        variant="standard"
        onChange={(e) => setFilter(e.target.value)}
        label="Search"
        value={filter || ''}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      ></TextField>
    </Tooltip>
  );
};
