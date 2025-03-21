//Importy zewnętrzne
import { TextField, InputAdornment, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
//Importy lokalane

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <Tooltip PopperProps={{ disablePortal: true }} title="Search" placement="right">
      <TextField
        variant="standard"
        onChange={(e) => setFilter(e.target.value)}
        label="Search"
        value={filter || ''}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#4a90e2' }} />
            </InputAdornment>
          )
        }}></TextField>
    </Tooltip>
  );
};
