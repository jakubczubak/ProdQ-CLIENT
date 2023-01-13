import React from 'react';
import styles from './Main.module.css';
import { Material } from '../material/Material';

export const Main = () => {
  return (
    <div className={styles.main_container}>
      <Material />
    </div>
  );
};
