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
import { CalculationItem } from '../calculation/CalculationItem';
import { useQuery } from '@tanstack/react-query';
import { departmentCostManager } from '../settings/service/departmentCostManager';
import { Loader } from '../common/Loader';
import { Error } from '../common/Error';
import { OrderList } from '../order/OrderList';
import { OrderItem } from '../order/OrderItem';
import { Dashboard } from '../dashboard/Dashboard';
import { Production } from '../production/Production';

export const Main = () => {
  const { data, isLoading, isError } = useQuery(
    ['defaultValues'],
    departmentCostManager.getDefaultDepartmentCost
  ); // fetch default department cost

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <Error message="Error fetching default department cost values! Please try again later!" />
    );

  if (!isError && !isLoading && data)
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
          <Route path="/calculations" element={<Calculations />} />
          <Route
            path="/calculation/new"
            element={data ? <CalculationItem defaultValues={data} /> : <CalculationItem />}
          />
          <Route path="/calculation/edit/" element={<CalculationItem />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/order/new" element={<OrderItem />} />
          <Route path="/order/edit" element={<OrderItem />} />
          <Route path="/recycling" element={<RecycleList />} />
          <Route path="/recycling/wtc" element={<RecycleItem />} />
          <Route path="/suppliers" element={<SupplierList />} />
          <Route path="/supplier/new" element={<SupplierForm />} />
          <Route path="/supplier/edit" element={<SupplierForm />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/department" element={<Settings tab={'3'} />} />
          <Route path="/production" element={<Production />} />
        </Routes>
      </div>
    );
};
