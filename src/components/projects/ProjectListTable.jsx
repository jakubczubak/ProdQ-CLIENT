// Importy zewnętrzne:
import React from 'react';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { DeleteModal } from '../common/DeleteModal';
import { useTable, useSortBy } from 'react-table';
import { Table } from './Table';
import { TableColumn } from './TableColumn';
// Import lokalny:
import styles from './css/ProjectListTable.module.css';

import { projectListManager } from './service/projectListManager';

export const ProjectListTable = ({ projectList }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleDeleteItem = () => {
    console.log('Delete item:', selectedItem.id);
    // projectListManager.deleteProject(selectedItem.id, queryClient, dispatch);
    // setOpenDeleteModal(false);
  };

  const data = React.useMemo(
    () => projectList,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [projectList, projectList.length]
  );
  const columns = TableColumn(projectList, setOpenDeleteModal, setSelectedItem);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useSortBy
  );

  return (
    <div className={styles.table_container}>
      <Table
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
        onDelete={handleDeleteItem}
        name={selectedItem.name}
        text="order"
      />
    </div>
  );
};
