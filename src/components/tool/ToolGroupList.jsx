//Importy zewnętrzne
import {
  SpeedDial,
  SpeedDialIcon,
  Breadcrumbs,
  Typography,
  TextField,
  Tooltip,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
//Importy lokalne
import styles from './css/ToolGroupList.module.css';
import { toolManager } from './service/toolManager';
import EditIcon from '@mui/icons-material/Edit';
import { Result } from './Result';
import { ToolGroupModal_ADD } from './ToolGroupModal_ADD';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';

const speedDialStyles = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  zIndex: 1
};

export const ToolGroupList = ({ open }) => {
  const [query, setQuery] = useState(''); // query for search
  const [isOpen, setIsOpen] = useState(open); // open the modal
  const { data, isLoading, isError } = useQuery(['tool'], toolManager.getToolGroups); // fetch all tools
  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}>
        <Typography color="text.primary">
          <Link to="/dashboard" className={styles.link}>
            ...
          </Link>
        </Typography>
        <Typography color="text.primary">Tools</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Tool Manager
        </Typography>
      </div>
      <Tooltip PopperProps={{ disablePortal: true }} title="Search" placement="right">
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
      <div className={styles.tool_container}>
        {isLoading && <Loader />}
        {isError && <Error message={'Failed to fetch tool list. Please try again later!'} />}
        {!isError && !isLoading && <Result data={data.length ? data : []} query={query} />}
      </div>
      <Tooltip PopperProps={{ disablePortal: true }} title="Add new tool group" placement="left">
        <SpeedDial
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
          ariaLabel="Navigation speed dial"
          sx={speedDialStyles}
          onClick={() => setIsOpen(true)}></SpeedDial>
      </Tooltip>
      <ToolGroupModal_ADD open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
