import React from 'react';
import styles from './Main.module.css';
import { MaterialList } from '../material/MaterialList';
import { Routes, Route } from 'react-router-dom';
import { Tools } from '../../components/Tools';
import { Calculations } from '../../components/Calculations';
import { Recycling } from '../../components/Recycling';
import { Settings } from '../../components/Settings';

export const Main = () => {
  return (
    <div className={styles.main_container}>
      <Routes>
        <Route path="/" element={<MaterialList />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/calculations" element={<Calculations />} />
        <Route path="/recycling" element={<Recycling />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
};
