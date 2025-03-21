import { TextField, InputAdornment, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const findClosestMatch = (searchInput, data, type) => {
  const [x, y, z] = searchInput.split('x').map(Number);
  if (!x || !y || !z) return null;

  const calculateDistanceXY = (item) => {
    if (type === 'Plate') {
      const check1 = item.x >= x && item.y >= y;
      const distance1 = check1 ? Math.abs(item.x - x) + Math.abs(item.y - y) : Infinity;
      const check2 = item.x >= y && item.y >= x;
      const distance2 = check2 ? Math.abs(item.x - y) + Math.abs(item.y - x) : Infinity;
      const minDistance = Math.min(distance1, distance2);
      return minDistance !== Infinity ? minDistance : Infinity;
    }
    return Infinity;
  };

  const exactZMatches = data.filter((item) => item.z === z);
  if (exactZMatches.length > 0) {
    const closestItem = exactZMatches.reduce((closest, current) => {
      const currentDistance = calculateDistanceXY(current);
      const closestDistance = calculateDistanceXY(closest);
      return currentDistance < closestDistance ? current : closest;
    }, exactZMatches[0]);
    return calculateDistanceXY(closestItem) !== Infinity ? [closestItem] : null;
  }

  const largerZMatches = data.filter((item) => item.z > z);
  if (largerZMatches.length === 0) return null;

  const closestZLargerMatches = largerZMatches.reduce((closestItems, current) => {
    const currentDz = current.z - z;
    const closestDz = closestItems.length > 0 ? closestItems[0].z - z : Infinity;
    if (currentDz < closestDz) return [current];
    else if (currentDz === closestDz) return [...closestItems, current];
    return closestItems;
  }, []);

  const closestItem = closestZLargerMatches.reduce((closest, current) => {
    const currentDistance = calculateDistanceXY(current);
    const closestDistance = calculateDistanceXY(closest);
    return currentDistance < closestDistance ? current : closest;
  }, closestZLargerMatches[0]);

  return calculateDistanceXY(closestItem) !== Infinity ? [closestItem] : null;
};

export const GlobalFilter = ({ filter, setFilter, data, type }) => {
  const handleFilterChange = (value) => {
    if (value.includes('x') && value.split('x').length === 3) {
      const closestData = findClosestMatch(value, data, type);
      if (closestData) setFilter({ value, closestData });
      else setFilter(value || undefined);
    } else {
      setFilter(value || undefined);
    }
  };

  return (
    <Tooltip
      PopperProps={{ disablePortal: true }}
      title="Search (e.g., WIDTH x HEIGHT x THICKNESS for dimensions)"
      placement="right">
      <TextField
        variant="standard"
        onChange={(e) => handleFilterChange(e.target.value)}
        label="Search"
        value={filter?.value || filter || ''}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#4a90e2' }} />
            </InputAdornment>
          )
        }}
      />
    </Tooltip>
  );
};
