import styles from './MaterialItemDetails.module.css';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumbs, Typography, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { materialManager } from './materialManager';
import { useQuery } from '@tanstack/react-query';

export const MaterialItemDetails = () => {
  const [query, setQuery] = useState('');
  let { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['materials', id],
    queryFn: () => materialManager.fetchMaterialByID(id)
  });

  return (
    <div>
      <Breadcrumbs
        className={styles.breadcrumbs}
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}
      >
        <Typography color="text.primary">...</Typography>
        <Typography color="text.primary">
          <Link to="/" className={styles.link}>
            Materials
          </Link>
        </Typography>
        <Typography color="text.primary"> {data && data.materialGroupCode}</Typography>
      </Breadcrumbs>
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
    </div>
  );
};
