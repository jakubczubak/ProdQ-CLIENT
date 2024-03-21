// Importy zewnętrzne:
import React from 'react';
import { useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
// Import lokalny:
import styles from './css/ProjectListTable.module.css';
import { ProjectListModal } from './ProjectListModal';
import { projectListManager } from './service/projectListManager';
import { DeleteModal } from '../common/DeleteModal';
import { Table } from './Table';
import { TableColumn } from './TableColumn';

export const ProjectListTable = ({ projectList }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openProjectListModal, setOpenProjectListModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleDeleteItem = () => {
    projectListManager.deleteProject(selectedItem.id, queryClient, dispatch);
    setOpenDeleteModal(false);
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setOpenProjectListModal(true);
  };

  const data = React.useMemo(
    () => projectList,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [projectList, projectList.length]
  );
  const columns = TableColumn(projectList, setOpenDeleteModal, setSelectedItem, handleEditItem);

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
        name={selectedItem ? selectedItem.name : ''}
        text="project"
      />
      <ProjectListModal
        open={openProjectListModal}
        item={selectedItem}
        onClose={() => setOpenProjectListModal(false)}
      />
    </div>
  );
};
