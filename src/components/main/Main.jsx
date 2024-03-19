// Importy zewnętrzne
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Importy lokalne
import styles from './css/Main.module.css';
import { MaterialGroupList } from '../material/MaterialGroupList';
import { ToolGroupList } from '../tool/ToolGroupList';
import { RecycleList } from '../recycling/RecycleList';
import { Settings } from '../settings/Settings';
import { MaterialGroupItemDetails } from '../material/MaterialGroupItemDetails';
import { ToolGroupItemDetails } from '../tool/ToolGroupItemDetails';
import { RecycleItem } from '../recycling/RecycleItem';
import { SupplierList } from '../supplier/SupplierList';
import { SupplierForm } from '../supplier/SupplierForm';
import { OrderList } from '../order/OrderList';
import { OrderItem } from '../order/OrderItem';
import { Dashboard } from '../dashboard/Dashboard';
import { ProjectList } from '../projects/ProjectList';
import { ProjectListItem } from '../projects/ProjectListItem';
import { NotFound } from '../common/NotFound';

export const Main = () => {
  return (
    <div className={styles.main_container}>
      <Routes>
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/materials" element={<MaterialGroupList />} />
        <Route path="/materials/new" element={<MaterialGroupList open={true} />} />
        <Route path="/materials/:id" element={<MaterialGroupItemDetails />} />
        <Route path="/tools" element={<ToolGroupList />} />
        <Route path="/tools/new" element={<ToolGroupList open={true} />} />
        <Route path="/tools/:id" element={<ToolGroupItemDetails />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/order/new" element={<OrderItem />} />
        <Route path="/order/edit" element={<OrderItem />} />
        <Route path="/recycling" element={<RecycleList />} />
        <Route path="/recycling/wtc" element={<RecycleItem />} />
        <Route path="/suppliers" element={<SupplierList />} />
        <Route path="/supplier/new" element={<SupplierForm />} />
        <Route path="/supplier/edit" element={<SupplierForm />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/department" element={<Settings tab={'4'} />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/:id" element={<ProjectListItem />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
