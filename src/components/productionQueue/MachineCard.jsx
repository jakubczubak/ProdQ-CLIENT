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
  time,
  programs,
  droppableId,
  onGenerateQueue,
  onSyncQueue
}) => {
  const buttonStyles = {
    fontSize: '16px',
    color: 'gray',
    textTransform: 'none',
    backgroundColor: 'transparent',
    '&:hover': { backgroundColor: 'transparent' }
  };

  return (
    <div className={styles.machine_card}>
      <img className={styles.machine_img} src={image} alt={name} />
      <h3 className={styles.machine_name}>{name}</h3>
      <Button
        variant="text"
        startIcon={<AccessTimeIcon />}
        size="small"
        disableRipple
        sx={buttonStyles}>
        {time}
      </Button>
      <div className={styles.machine_programs_container}>
        <Droppable droppableId={droppableId} direction="vertical">
          {(provided, snapshot) => (
            <div
              className={styles.machine_programs}
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ minHeight: '230px' }}>
              {programs.length === 0 && !snapshot.isDragging && !snapshot.isDraggingOver && (
                <div className={styles.placeholder}>Drop program here!</div>
              )}
              {programs.map((program, index) => (
                <NCProgram program={program} key={program.id} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <div className={styles.machine_btn}>
        <Tooltip title="Generate queue">
          <IconButton aria-label="download" onClick={onGenerateQueue}>
            <DownloadOutlinedIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Sync queue">
          <IconButton aria-label="sync" onClick={onSyncQueue}>
            <SyncOutlinedIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Save nc programs on machine">
          <IconButton aria-label="sync" onClick={onSyncQueue}>
            <FolderCopyOutlinedIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};
