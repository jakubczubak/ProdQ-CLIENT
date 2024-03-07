// Importy zewnętrzne
import React from 'react';
import { useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

// Importy lokalne
import { DeleteModal } from '../common/DeleteModal';
import { productionManager } from './service/productionManager';
import { savePDF } from '../common/service/savePDF';
import { ProductionModal } from './ProductionModal';
import { productionCartManager } from './../productionCart/service/productionCartManager';
import { TableColumn } from './TableColumn';
import { Table } from './Table';
import styles from './css/ProductionTable.module.css';

export const ProductionTable = ({ items }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProductionItem, setSelectedProductionItem] = useState({});
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleDeleteRecycleItem = () => {
    productionManager.deleteProductionItem(selectedProductionItem.id, queryClient, dispatch);
    setOpenDeleteModal(false);
  };

  const handleSavePDF = (item) => {
    savePDF(item);
  };

  const handleAddToProductionBox = (item) => {
    console.log('item', item);
    productionCartManager.addItem(item, dispatch);
  };

  const data = React.useMemo(
    () => items,

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, items.length]
  );
  const columns = TableColumn(
    handleAddToProductionBox,
    setSelectedProductionItem,
    setOpen,
    setOpenDeleteModal,
    handleSavePDF,
    items
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useSortBy
  );

  return (
    <div className={styles.table_container}>
      <Table
        columns={columns}
        getTableBodyProps={getTableBodyProps}
        getTableProps={getTableProps}
        headerGroups={headerGroups}
        prepareRow={prepareRow}
        rows={rows}
      />

      <DeleteModal
        open={openDeleteModal}
        onCancel={() => setOpenDeleteModal(false)}
        onDelete={handleDeleteRecycleItem}
        name={selectedProductionItem.partName}
        text="production item"
      />

      {open && <ProductionModal onClose={() => setOpen(false)} item={selectedProductionItem} />}
    </div>
  );
};
