import React from 'react';
import styles from './css/Cnc.module.css';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Breadcrumbs } from '@mui/material';
import { useState } from 'react';
import { Dnd } from './Dnd';
import { GlobalFilter } from '../tool/GlobalFilter';
import { CncJobModal } from './CncJobModal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCurrentTask } from '../../redux/actions/Action';

export const Cnc = () => {
  const dispatch = useDispatch();

  const currentTask = useSelector((state) => state.currentTask);
  const [isOpen, setIsOpen] = useState(false); // open the modal
  const [filter, setFilter] = useState(''); // search filter

  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<Typography color="text.primary">/</Typography>}>
        <Typography color="text.primary">...</Typography>
        <Typography color="text.primary">Cnc jobs</Typography>
      </Breadcrumbs>
      <div className={styles.header}>
        <Typography variant="h5" component="div">
          Manage cnc jobs
        </Typography>
      </div>
      <GlobalFilter filter={filter} setFilter={setFilter} />
      <Dnd filter={filter} />
      <SpeedDial
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        ariaLabel="Navigation speed dial"
        sx={speedDialStyles}>
        <SpeedDialAction icon={<AddIcon />} tooltipTitle="Create" onClick={() => setIsOpen(true)} />
      </SpeedDial>
      <CncJobModal
        open={isOpen || currentTask}
        onClose={() => {
          setIsOpen(false);
          dispatch(setCurrentTask(null));
        }}
        task={currentTask}
      />
    </>
  );
};
const speedDialStyles = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  zIndex: 1
};
