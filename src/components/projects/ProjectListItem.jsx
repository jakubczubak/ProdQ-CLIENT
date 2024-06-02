// Importy zewnętrzne:
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumbs, Tooltip, Typography } from '@mui/material';
import { FormGroup, FormControlLabel } from '@mui/material';
import { SpeedDial, SpeedDialIcon } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// Importy lokalne:
import styles from '../projects/css/ProjectListItem.module.css';
import { ProjectListItemTable } from './ProjectListItemTable';
import { IOSSwitch } from '../common/IOSSwitch';
import { projectListManager } from './service/projectListManager';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';
import { ProductionModal } from '../production/ProductionModal';
import { ProjectInfo } from './ProjectInfo';

const speedDialStyles = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  zIndex: 1
};

export const ProjectListItem = () => {
  const { id } = useParams();
  const [status, setStatus] = useState('pending');
  const [projectName, setProjectName] = useState('Project name');
  const [productionTime, setProductionTime] = useState(0);
  const [materialValue, setMaterialValue] = useState(100);
  const [toolValue, setToolValue] = useState(0);
  const [hourlyRate, setHourlyRate] = useState(0);
  const [productionValue, setProductionValue] = useState(0);
  const [productionValueBasedOnDepartmentCost, setProductionValueBasedOnDepartmentCost] =
    useState(0);
  const [totalProductionValue, setTotalProductionValue] = useState(0);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const selectedProductionItem = useSelector((state) => state.productionItem);
  const selectedMaterial = useSelector((state) => state.material);
  const [open, setOpen] = useState(selectedMaterial ? true : false);
  const { data, isLoading, isError } = useQuery(
    ['projectItem', id], // queryKey
    () => projectListManager.getProjectItemByID(id) // queryFn
  );

  const handleProjectStatus = () => {
    if (status === 'pending') {
      setStatus('done');
    } else {
      setStatus('pending');
    }
    projectListManager.updateProjectStatus(id, queryClient, dispatch);
  };

  const handleChangeProjectHourlyRate = (e) => {
    const { value } = e.target;
    if (!isNaN(value) && parseFloat(value) >= 0) {
      setHourlyRate(value);
      projectListManager.updateProjectHourlyRate(id, value, queryClient, dispatch);
    } else {
      console.error('Invalid value for hourly rate');
    }
  };

  useEffect(() => {
    if (data) {
      setStatus(data.status);
      setProjectName(data.name);
      setProductionTime(data.productionTime);
      setMaterialValue(data.materialValue);
      setToolValue(data.toolValue);
      setHourlyRate(data.hourlyRate);
      setProductionValue(data.productionValue);
      setProductionValueBasedOnDepartmentCost(data.productionValueBasedOnDepartmentCost);
      setTotalProductionValue(data.totalProductionValue);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error message="Error fetch project item. Please try again later!" />;
  }

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
        <Link color="inherit" to="/projects" className={styles.link}>
          <Typography color="text.primary">Project list</Typography>
        </Link>
        <Typography color="text.primary">{projectName}</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Project details
        </Typography>
      </div>
      <div className={styles.project_status_wrapper}>
        <FormGroup>
          <Tooltip title="Click when project is FINISHED" placement="top">
            <FormControlLabel
              control={<IOSSwitch sx={{ m: 1 }} size="small" />}
              label="Finished"
              color="warning"
              checked={status === 'done' ? true : false}
              onChange={handleProjectStatus}
            />
          </Tooltip>
        </FormGroup>
      </div>
      <ProjectInfo
        handleChangeProjectHourlyRate={handleChangeProjectHourlyRate}
        hourlyRate={hourlyRate}
        materialValue={materialValue}
        productionTime={productionTime}
        productionValue={productionValue}
        productionValueBasedOnDepartmentCost={productionValueBasedOnDepartmentCost}
        projectName={projectName}
        toolValue={toolValue}
        totalProductionValue={totalProductionValue}
      />
      <div className={styles.project_table_wrapper}>
        <ProjectListItemTable projectID={id} productionItems={data.productionItems} />
      </div>
      <Tooltip title="Add production" placement="left">
        <SpeedDial
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
          ariaLabel="Navigation speed dial"
          sx={speedDialStyles}
          onClick={() => setOpen(true)}
        ></SpeedDial>
      </Tooltip>
      {open && (
        <ProductionModal
          projectID={id}
          onClose={() => setOpen(false)}
          item={selectedProductionItem}
          selectedMaterial={selectedMaterial}
        />
      )}
    </>
  );
};
