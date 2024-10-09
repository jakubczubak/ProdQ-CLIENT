// Importy zewnętrzne:
import React from 'react';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { DeleteModal } from '../common/DeleteModal';
import { useTable, useSortBy } from 'react-table';
import { orderManager } from './service/orderManager';
import { Table } from './Table';
import { TableColumn } from './TableColumn';
import { useNavigate } from 'react-router-dom';

// Import lokalny:
import styles from './css/OrderTable.module.css';

export const OrderTable = ({ orderList }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteItem = () => {
    orderManager.deleteOrder(selectedItem.id, queryClient, dispatch);
    setOpenDeleteModal(false);
  };

  const data = React.useMemo(
    () => orderList,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [orderList, orderList.length]
  );
  const columns = TableColumn(orderList, setOpenDeleteModal, setSelectedItem);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useSortBy
  );

  const onEdit = (id) => {
    const item = orderList.find((item) => item.id === id);
    navigate('/order/edit', { state: item });
  };

  return (
    <div className={styles.table_container}>
      <Table
        getTableBodyProps={getTableBodyProps}
        getTableProps={getTableProps}
        headerGroups={headerGroups}
        rows={rows}
        columns={columns}
        prepareRow={prepareRow}
        onEdit={onEdit}
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
