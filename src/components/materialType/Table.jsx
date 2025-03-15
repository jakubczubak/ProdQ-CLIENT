// Importy zewnętrzne
import { useTable, useSortBy } from 'react-table';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import React from 'react';
// Importy lokalne
import styles from './css/Table.module.css';
import { DeleteModal } from '../common/DeleteModal';
import { materialTypeManager } from './service/materialTypeManager';
import { MaterialTypeModal } from './MaterialTypeModal';
import { TableColumn } from './TableColumn';
import { MaterialTypeTable } from './MaterialTypeTable';

export const Table = ({ items }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isOpenMaterialTypeModal, setIsOpenMaterialTypeModal] = useState(false);
  const [selectedRecycleItem, setSelectedRecycleItem] = useState({});
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleDelete = () => {
    materialTypeManager.deleteMaterialType(selectedRecycleItem.id, queryClient, dispatch);
    setOpenDeleteModal(false);
  };

  const data = React.useMemo(
    () => items,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, items.length]
  );

  const columns = TableColumn(
    items,
    setSelectedRecycleItem,
    setIsOpenMaterialTypeModal,
    setOpenDeleteModal
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data }, useSortBy);

  return (
    <div className={styles.table_container}>
      <MaterialTypeTable
        getTableBodyProps={getTableBodyProps}
        getTableProps={getTableProps}
        headerGroups={headerGroups}
        rows={rows}
        columns={columns}
        prepareRow={prepareRow}
      />
      <DeleteModal
        open={openDeleteModal}
        onCancel={() => setOpenDeleteModal(false)}
        onDelete={handleDelete}
        name={selectedRecycleItem.name}
        text="material type"
      />
      <MaterialTypeModal
        item={selectedRecycleItem}
        open={isOpenMaterialTypeModal}
        onClose={() => setIsOpenMaterialTypeModal(false)}
      />
    </div>
  );
};