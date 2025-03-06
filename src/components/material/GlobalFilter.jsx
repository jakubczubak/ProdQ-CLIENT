//Importy zewnętrzne
import { TextField, InputAdornment, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const findClosestMatch = (searchInput, data, type) => {
  const [x, y, z] = searchInput.split('x').map(Number);
  if (!x || !y || !z) return null; // Jeśli format jest niepoprawny, zwróć null

  const calculateDistance = (item) => {
    if (type === 'Plate') {
      const dx = item.x - x;
      const dy = item.y - y;
      const dz = item.z - z;
      return Math.sqrt(dx * dx + dy * dy + dz * dz); // Odległość euklidesowa
    }
    // Możesz dodać obsługę innych typów (Tube, Rod) w przyszłości
    return Infinity;
  };

  const closestItem = data.reduce((closest, current) => {
    const currentDistance = calculateDistance(current);
    const closestDistance = calculateDistance(closest);
    return currentDistance < closestDistance ? current : closest;
  }, data[0]);

  return [closestItem]; // Zwracamy tablicę z jednym elementem
};

export const GlobalFilter = ({ filter, setFilter, data, type }) => {
  const handleFilterChange = (value) => {
    if (value.includes('x') && value.split('x').length === 3) {
      // Jeśli format to NxNxN
      const closestData = findClosestMatch(value, data, type);
      if (closestData) {
        setFilter({ value, closestData }); // Przekazujemy obiekt z wartością i wynikiem
      } else {
        setFilter(value || undefined); // Wróć do standardowego filtrowania, jeśli nie znaleziono
      }
    } else {
      setFilter(value || undefined); // Standardowe filtrowanie tekstowe
    }
  };

  return (
    <Tooltip title="Search (e.g., WIDTH x HEIGHT x THICKNES for dimensions)" placement="right">
      <TextField
        variant="standard"
        onChange={(e) => handleFilterChange(e.target.value)}
        label="Search"
        value={filter?.value || filter || ''}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
    </Tooltip>
  );
};
