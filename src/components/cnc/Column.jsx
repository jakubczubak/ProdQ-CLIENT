import React from 'react';
import styles from './css/Column.module.css';
import { Task } from './Task';
import { StrictModeDroppable as Droppable } from '../helpers/StrictModeDroppable';
import image from '../../assets/BACAR1000.png';
import CloudSyncOutlinedIcon from '@mui/icons-material/CloudSyncOutlined';
import { Tooltip } from '@mui/material';

export const Column = ({ id, title, tasks }) => {
  return (
    <div key={id} className={styles.column}>
      <h3 className={styles.column_header}>{title}</h3>
      {(id === 'column-2' || id === 'column-3') && (
        <>
          {' '}
          <Tooltip title="Sync with machine" placement="top">
            <CloudSyncOutlinedIcon
              color="action"
              sx={{
                position: 'absolute',
                top: '10px',
                right: '50%',
                transform: 'translateX(50%)',
                cursor: 'pointer'
              }}
            />
          </Tooltip>
          <img src={image} alt="" className={styles.image} />
        </>
      )}
      <Droppable droppableId={id}>
        {(provided) => (
          <div className={styles.task_list} ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
