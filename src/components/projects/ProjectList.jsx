import React from 'react';
import styles from './css/ProjectList.module.css';
import {
  Breadcrumbs,
  Typography,
  Tooltip,
  TextField,
  InputAdornment,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { ProjectListModal } from './ProjectListModal';

export const ProjectList = () => {
  const [query, setQuery] = useState('');
  const [projectListModal, setProjectListModal] = useState(false);

  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}>
        <Typography color="text.primary">...</Typography>
        <Typography color="text.primary">Project list</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Manage projects
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
      <SpeedDial
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        ariaLabel="Navigation speed dial"
        sx={speedDialStyles}>
        <SpeedDialAction
          icon={<AddIcon />}
          tooltipTitle="Create new project"
          onClick={() => setProjectListModal(true)}
        />
      </SpeedDial>
      <ProjectListModal open={projectListModal} onClose={() => setProjectListModal(false)} />
    </>
  );
};

const speedDialStyles = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  zIndex: 1
};
