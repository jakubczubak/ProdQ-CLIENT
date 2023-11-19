import React from 'react';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { DeleteModal } from '../common/DeleteModal';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/no-data-animation.json';
import { useTable, useSortBy } from 'react-table';
import { useNavigate } from 'react-router-dom';
import { orderManager } from './service/orderManager';
import { Tooltip, IconButton } from '@mui/material';
import styles from './css/OrderTable.module.css';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

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

    [orderList, orderList.length]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'NAME',

        accessor: 'name' // accessor is the "key" in the data
      },

      {
        Header: 'DATE',

        accessor: 'date'
      },

      {
        Header: 'PRICE',

        accessor: 'totalPrice',
        Cell: ({ row }) => (
          <Tooltip title="Order price">
            <div className={styles.success}>{row.original.totalPrice} PLN</div>
          </Tooltip>
        )
      },
      {
        Header: 'STATUS',
        accessor: 'status',
        Cell: ({ row }) => {
          if (row.original.status === 'pending') {
            return (
              <Tooltip title="Order status">
                <div className={styles.pending}>{row.original.status}</div>
              </Tooltip>
            );
          } else if (row.original.status === 'on the way') {
            return (
              <Tooltip title="Order status">
                <div className={styles.on_the_way}>{row.original.status}</div>
              </Tooltip>
            );
          } else if (row.original.status === 'delivered') {
            return (
              <Tooltip title="Order status">
                <div className={styles.delivered}>{row.original.status}</div>
              </Tooltip>
            );
          }
        }
      },
      {
        Header: 'ACTIONS',
        accessor: 'id',
        Cell: ({ cell }) => (
          <div>
            <Tooltip title="Edit order">
              <IconButton
                onClick={() => {
                  const item = orderList.find((x) => x.id === cell.value);
                  navigate('/order/edit', { state: item });
                }}>
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete order">
              <IconButton
                onClick={() => {
                  setSelectedItem(orderList.find((x) => x.id === cell.value));
                  setOpenDeleteModal(true);
                }}>
                <DeleteOutlineIcon />
              </IconButton>
            </Tooltip>
          </div>
        )
      }
    ],
    [orderList, orderList.length]
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
      <table {...getTableProps()} className={styles.table}>
        <thead className={styles.thead}>
          {headerGroups.map((headerGroup, index) => (
            <tr key={`header-${index}`} {...headerGroup.getHeaderGroupProps()}>
              <th>ID</th>
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  key={`header-${index}-${columnIndex}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div className={styles.sort}>
                    {column.render('Header')}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ArrowDownwardIcon fontSize="inherit" />
                      ) : (
                        <ArrowUpwardIcon fontSize="inherit" />
                      )
                    ) : (
                      ''
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()} className={styles.tbody}>
          {rows.length === 0 && (
            <tr className={styles.no_data}>
              <td colSpan={columns.length + 1} className={styles.no_data}>
                <Lottie animationData={animation} loop={true} className={styles.animation} />
              </td>
            </tr>
          )}
          {rows.map((row, rowIndex) => {
            prepareRow(row);

            return (
              <tr key={`row-${rowIndex}`} {...row.getRowProps()}>
                <td key={`row-${rowIndex}-id`}>{rowIndex + 1}</td>
                {row.cells.map((cell, cellIndex) => {
                  return (
                    <td key={`row-${rowIndex}-cell-${cellIndex}`} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
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
