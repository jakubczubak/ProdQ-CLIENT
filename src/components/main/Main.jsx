import React from 'react';
import styles from './Main.module.css';
import { MaterialGroupList } from '../material/MaterialGroupList';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToolGroupList } from '../tool/ToolGroupList';
import { Calculations } from '../../components/Calculations';
import { RecycleList } from '../../components/recycling/RecycleList';
import { Settings } from '../../components/Settings';
import { MaterialGroupItemDetails } from '../material/MaterialGroupItemDetails';
import { ToolGroupItemDetails } from '../tool/ToolGroupItemDetails';
import { RecycleItem } from '../../components/recycling/RecycleItem';

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
        <Route path="/recycling" element={<RecycleList />} />
        <Route path="/recycling/wtc" element={<RecycleItem />} />

        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
};
