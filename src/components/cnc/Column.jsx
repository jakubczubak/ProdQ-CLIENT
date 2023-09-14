import React from 'react';
import styles from './css/Column.module.css';
import { Task } from './Task';

export const Column = ({ id, title, tasks }) => {
  return (
    <div key={id} className={styles.column}>
      <h3 className={styles.column_header}>{title}</h3>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};
