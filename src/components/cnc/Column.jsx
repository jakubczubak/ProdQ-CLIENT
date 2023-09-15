import React from 'react';
import styles from './css/Column.module.css';
import { Task } from './Task';
import { StrictModeDroppable as Droppable } from '../helpers/StrictModeDroppable';

export const Column = ({ id, title, tasks }) => {
  return (
    <div key={id} className={styles.column}>
      <h3 className={styles.column_header}>{title}</h3>
      <Droppable droppableId={id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
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
