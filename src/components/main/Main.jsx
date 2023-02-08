import React from 'react';
import styles from './Main.module.css';
import { MaterialGroupList } from '../material/MaterialGroupList';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToolGroupList } from '../tool/ToolGroupList';
import { Calculations } from '../../components/Calculations';
import { Recycling } from '../../components/Recycling';
import { Settings } from '../../components/Settings';
import { MaterialGroupItemDetails } from '../material/MaterialGroupItemDetails';
import { ToolGroupItemDetails } from '../tool/ToolGroupItemDetails';

export const Main = () => {
  return (
    <div className={styles.main_container}>
      <Routes>
        <Route path="/" element={<Navigate replace to="/materials" />} />
        <Route path="/materials" element={<MaterialGroupList />} />
        <Route path="/materials/:id" element={<MaterialGroupItemDetails />} />
        <Route path="/tools" element={<ToolGroupList />} />
        <Route path="/tools/:id" element={<ToolGroupItemDetails />} />
        <Route path="/calculations" element={<Calculations />} />
        <Route path="/recycling" element={<Recycling />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
};
