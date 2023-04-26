import React from 'react';
import styles from './Main.module.css';
import { MaterialGroupList } from '../material/MaterialGroupList';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToolGroupList } from '../tool/ToolGroupList';
import { Calculations } from '../../components/calculation/Calculations';
import { RecycleList } from '../../components/recycling/RecycleList';
import { Settings } from '../../components/settings/Settings';
import { MaterialGroupItemDetails } from '../material/MaterialGroupItemDetails';
import { ToolGroupItemDetails } from '../tool/ToolGroupItemDetails';
import { RecycleItem } from '../../components/recycling/RecycleItem';
import { SupplierList } from '../supplier/SupplierList';
import { SupplierForm } from '../supplier/SupplierForm';

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
        <Route path="/suppliers" element={<SupplierList />} />
        <Route path="/supplier/new" element={<SupplierForm />} />
        <Route path="/supplier/edit" element={<SupplierForm />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
};
