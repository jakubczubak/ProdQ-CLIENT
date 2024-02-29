// Importy zewnętrzne:
import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from 'react-router-dom';
import { Tooltip, IconButton } from '@mui/material';
// Importy lokalne:
import styles from './css/OrderTable.module.css';

export const TableColumn = (orderList, setOpenDeleteModal, setSelectedItem) => {
  const navigate = useNavigate();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [orderList, orderList.length]
  );
  return columns;
};
