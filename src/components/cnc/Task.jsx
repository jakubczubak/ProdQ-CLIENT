import React from 'react';
import styles from './css/Task.module.css';
import { Draggable } from 'react-beautiful-dnd';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Tooltip from '@mui/material/Tooltip';
import { cncManager } from './service/cncManager';

export const Task = ({ task, index }) => {
  const handleDelete = () => {
    cncManager.deleteTask(task.id);
  };

  const handleEdit = () => {
    cncManager.updateTask(task.id);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={styles.task}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          data-dragging={snapshot.isDragging}>
          {task.type === 'plate' && <p className={`${styles.type} ${styles.plate}`}>Plate</p>}
          {task.type === 'modification' && (
            <p className={`${styles.type} ${styles.modification}`}>Modification</p>
          )}
          {task.type === 'part' && <p className={`${styles.type} ${styles.part}`}>Part</p>}
          <Tooltip title="Device name" placement="top">
            <p className={styles.device_name}>{task.device_name}</p>
          </Tooltip>
          <Tooltip title="Name" placement="top">
            <p className={styles.content}>{task.content}</p>
          </Tooltip>
          <Tooltip title="Material" placement="top">
            <p className={styles.material}>{task.material}</p>
          </Tooltip>
          <Tooltip title="Dimensions" placement="top">
            <p className={styles.dimension}>{task.dimension}</p>
          </Tooltip>
          <Tooltip title="Quantity" placement="top">
            <p className={styles.quantity}>
              {task.quantity}
              <span className={styles.quantity_text}>x</span>
            </p>
          </Tooltip>
          <div className={styles.time_wrapper}>
            <Tooltip title="CAM time" placement="top">
              <p className={styles.time}>{task.time}</p>
            </Tooltip>
            <AccessTimeOutlinedIcon
              sx={{
                color: '#4a4a4a',
                height: '20px',
                width: '20px'
              }}
            />

            <Tooltip title="Total CAM time" placement="top">
              <p className={styles.total_time}>{task.total_time}</p>
            </Tooltip>
            <AccessTimeOutlinedIcon
              sx={{
                color: '#4a4a4a',
                height: '20px',
                width: '20px'
              }}
            />
          </div>
          <Tooltip title="Edit" placement="top">
            <ModeEditOutlineOutlinedIcon
              onClick={handleEdit}
              color="action"
              sx={{
                position: 'absolute',
                right: '10px',
                top: '10px',

                height: '16px',
                width: '16px'
              }}
            />
          </Tooltip>
          <Tooltip title="Delete" placement="top">
            <DeleteOutlineOutlinedIcon
              onClick={handleDelete}
              color="action"
              sx={{
                position: 'absolute',
                right: '10px',
                bottom: '10px',

                height: '16px',
                width: '16px'
              }}
            />
          </Tooltip>
        </div>
      )}
    </Draggable>
  );
};
