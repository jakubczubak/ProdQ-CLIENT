import React from 'react';
import { Tooltip, Button, IconButton } from '@mui/material';
import styles from './css/productionQueue.module.css';
import { NCProgram } from './NCProgram';
import { Droppable } from '@hello-pangea/dnd';
import {
  AccessTime as AccessTimeIcon,
  DownloadOutlined as DownloadOutlinedIcon,
  SyncOutlined as SyncOutlinedIcon
} from '@mui/icons-material';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';

export const MachineCard = ({
  image,
  name,
  programs,
  droppableId,
  onGenerateQueue,
  onSyncQueue
}) => {
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

  return (
    <div className={styles.machine_card}>
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
        <Droppable droppableId={droppableId} direction="vertical">
          {(provided, snapshot) => {
            const isPlaceholderVisible = programs.length === 0 && !snapshot.isDragging && !snapshot.isDraggingOver;
            return (
              <div
                className={styles.machine_programs}
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ minHeight: '240px' }}>
                {isPlaceholderVisible && <div className={styles.placeholder}>Drop program here!</div>}
                {programs.map((program, index) => (
                  <NCProgram program={program} key={program.id} index={index} />
                ))}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </div>
    </div>
  );
};