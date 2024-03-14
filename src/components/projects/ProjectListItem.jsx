import React from 'react';
import styles from '../projects/css/ProjectListItem.module.css';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export const ProjectListItem = () => {
  const { id } = useParams();

  console.log(id);
  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}>
        <Typography color="text.primary">...</Typography>
        <Link color="inherit" to="/projects" className={styles.link}>
          <Typography color="text.primary">Project list</Typography>
        </Link>
        <Typography color="text.primary">General info</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Project information - {id}
        </Typography>
      </div>
    </>
  );
};
