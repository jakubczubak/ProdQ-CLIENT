import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Breadcrumbs,
  Typography,
  TextField,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styles from './css/ToolGroupList.module.css';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toolManager } from './service/toolManager';
import EditIcon from '@mui/icons-material/Edit';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Result } from './Result';
import { ToolGroupModal_ADD } from './ToolGroupModal_ADD';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';

export const ToolGroupList = ({ open }) => {
  const [query, setQuery] = useState(''); // query for search
  const [isOpen, setIsOpen] = useState(open); // open the modal
  const { data, isLoading, isError } = useQuery(['tool'], toolManager.getToolGroups); // fetch all tools
  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}>
        <Typography color="text.primary">...</Typography>
        <Typography color="text.primary">Tools</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Manage tools
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
          }}></TextField>
      </Tooltip>
      <div className={styles.tool_container}>
        {isLoading && <Loader />}
        {isError && <Error message={'Failed to fetch tool list. Please try again later!'} />}
        {!isError && !isLoading && <Result data={data.length ? data : []} query={query} />}
      </div>
      <SpeedDial
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        ariaLabel="Navigation speed dial"
        sx={speedDialStyles}>
        <SpeedDialAction
          icon={<AddIcon />}
          tooltipTitle="Create tool group"
          onClick={() => setIsOpen(true)}
        />
      </SpeedDial>
      <ToolGroupModal_ADD open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

const speedDialStyles = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  zIndex: 1
};
