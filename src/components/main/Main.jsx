import React from 'react';
import styles from './Main.module.css';
import { MaterialList } from '../material/MaterialList';

export const Main = () => {
  return (
    <div className={styles.main_container}>
      <MaterialList />
    </div>
  );
};
