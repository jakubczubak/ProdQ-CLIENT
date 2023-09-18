import React from 'react';
import styles from './css/Task.module.css';
import { Draggable } from 'react-beautiful-dnd';

export const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={styles.task}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          data-dragging={snapshot.isDragging}>
          {task.content}
        </div>
      )}
    </Draggable>
  );
};
