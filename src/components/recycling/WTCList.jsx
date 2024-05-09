// Importy zewnętrzne
import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { recycleManager } from './service/recycleManager';

// Importy lokalne
import styles from './css/WTCList.module.css';
import { DeleteModal } from '../common/DeleteModal';
import { TableColumn } from './TableColumn';
import { Table } from './Table';

export const WTCList = ({ item }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedRecycleItem, setSelectedRecycleItem] = useState({});
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleDeleteRecycleItem = () => {
    recycleManager.deleteWTC(selectedRecycleItem.id, queryClient, dispatch);
    setOpenDeleteModal(false);
  };

  const handleSavePDF = (item) => {
    console.log('Save PDF', item);
    //For now, it's just a console.log
  };

  const data = React.useMemo(
    () => item,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [item, item.length]
  );

  const columns = TableColumn(item, setSelectedRecycleItem, setOpenDeleteModal, handleSavePDF);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useSortBy
  );

  return (
    <div className={styles.table_container}>
      <Table
        getTableBodyProps={getTableBodyProps}
        columns={columns}
        getTableProps={getTableProps}
        headerGroups={headerGroups}
        prepareRow={prepareRow}
        rows={rows}
      />
      <DeleteModal
        open={openDeleteModal}
        onCancel={() => setOpenDeleteModal(false)}
        onDelete={handleDeleteRecycleItem}
        name={selectedRecycleItem.company}
        text="waste transfer card"
      />
    </div>
  );
};
