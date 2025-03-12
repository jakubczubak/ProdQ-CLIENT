import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Tooltip, Button, IconButton } from '@mui/material';
import styles from './css/productionQueue.module.css';
import { NCProgram } from './NCProgram';
import {
  AccessTime as AccessTimeIcon,
  DownloadOutlined as DownloadOutlinedIcon,
  SyncOutlined as SyncOutlinedIcon
} from '@mui/icons-material';
import classNames from 'classnames';

export const MachineCard = ({ image, name, programs, onGenerateQueue, onSyncQueue }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `machine-card-${name.toLowerCase().replace(' ', '-')}`
  });

  const totalTime = React.useMemo(() => {
    return programs.reduce((sum, program) => sum + program.time, 0);
  }, [programs]);

  const formatTime = (timeInMinutes) => {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}h:${formattedMinutes}m`;
  };

  const formattedTime = React.useMemo(() => formatTime(totalTime), [totalTime]);
  const programIds = programs.map((program) => program.id);

  return (
    <div
      ref={setNodeRef}
      className={classNames(styles.machine_card, {
        [styles.machine_card_active]: isOver
      })}>
      <img className={styles.machine_img} src={image} alt={name} />
      <h3 className={styles.machine_name}>{name}</h3>
      <Button
        variant="text"
        startIcon={<AccessTimeIcon />}
        size="small"
        disableRipple
        sx={{
          fontSize: '16px',
          color: 'gray',
          textTransform: 'none',
          backgroundColor: 'transparent',
          '&:hover': { backgroundColor: 'transparent' }
        }}>
        {formattedTime}
      </Button>
      <div className={styles.machine_programs_container}>
        <div className={styles.machine_programs}>
          <SortableContext items={programIds} strategy={verticalListSortingStrategy}>
            {programs.length === 0 && (
              <div className={styles.placeholder}>No programs here yet!</div>
            )}
            {programs.map((program, index) => (
              <NCProgram program={program} key={program.id} index={index} />
            ))}
          </SortableContext>
        </div>
      </div>
    </div>
  );
};
