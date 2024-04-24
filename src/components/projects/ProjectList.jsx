// Importy zewnętrzne:
import React from 'react';
import {
  Breadcrumbs,
  Typography,
  Tooltip,
  TextField,
  InputAdornment,
  SpeedDial,
  SpeedDialIcon
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
// Importy lokalne:
import { ProjectListModal } from './ProjectListModal';
import { projectListManager } from './service/projectListManager';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';
import { ProjectListTable } from './ProjectListTable';
import styles from './css/ProjectList.module.css';

const speedDialStyles = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  zIndex: 1
};

export const ProjectList = () => {
  const [query, setQuery] = useState('');
  const [projectListModal, setProjectListModal] = useState(false);
  const { data, isLoading, isError } = useQuery(['project'], projectListManager.getProjects); // fetch all projects

  const sortByCreatedOn = (items) => {
    return items.slice().sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
  };

  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}
      >
        <Typography color="text.primary">
          <Link to="/dashboard" className={styles.link}>
            ...
          </Link>
        </Typography>
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
          }}
        ></TextField>
      </Tooltip>
      {isLoading && <Loader />}
      {isError && <Error message={'Failed to fetch projects. Please try again later!'} />}
      {data && (
        <ProjectListTable
          projectList={sortByCreatedOn(data).filter((project) => {
            if (query === '') return project;
            else if (project.name.toLowerCase().includes(query.toLowerCase())) return project;
          })}
        />
      )}
      <Tooltip title="Add project" placement="left">
        <SpeedDial
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
          ariaLabel="Navigation speed dial"
          sx={speedDialStyles}
          onClick={() => setProjectListModal(true)}
        ></SpeedDial>
      </Tooltip>
      <ProjectListModal open={projectListModal} onClose={() => setProjectListModal(false)} />
    </>
  );
};
