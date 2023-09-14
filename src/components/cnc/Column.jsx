import React from 'react';
import styles from './css/Column.module.css';

export const Column = ({ id, title, tasks }) => {
  return (
    <div key={id} className={styles.column}>
      <h3 className={styles.column_header}>{title}</h3>
      {tasks.map((task) => (
        <div key={task.id}>{task.content}</div>
      ))}
    </div>
  );
};
