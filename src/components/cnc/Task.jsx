import React from 'react';
import styles from './css/Task.module.css';

export const Task = ({ task }) => {
  return <div className={styles.task}>{task.content}</div>;
};
