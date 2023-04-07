import React from 'react';
import { useTable } from 'react-table';
import { Tooltip, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import styles from './css/WTCList.module.css';
import { useState } from 'react';
import { DeleteModal } from '../common/DeleteModal';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { recycleManager } from './service/recycleManager';
import { useNavigate } from 'react-router-dom';

export const WTCList = ({ item }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedRecycleItem, setSelectedRecycleItem] = useState({});

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteRecycleItem = () => {
    recycleManager.deleteWTC(selectedRecycleItem.id, queryClient, dispatch);
    setOpenDeleteModal(false);
  };

  const data = React.useMemo(
    () => item,

    [item, item.length]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'DATE',

        accessor: 'date' // accessor is the "key" in the data
      },

      {
        Header: 'RECEIVER',

        accessor: 'receiver'
      },
      {
        Header: 'VALUE',

        accessor: 'value',
        Cell: ({ row }) => {
          if (row.original.value < 0)
            return (
              <Tooltip title="Disposal fee">
                <div className={styles.error}>{row.original.value} PLN </div>
              </Tooltip>
            );
          else return <div className={styles.success}>{row.original.value} PLN</div>;
        }
      },
      {
        Header: 'ACTION',
        accessor: 'id',
        Cell: ({ cell }) => (
          <div>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => {
                  const selectedRecycleItem = item.find((x) => x.id === cell.value);
                  navigate('/recycling/wtc/', { state: selectedRecycleItem });
                }}>
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={() => {
                  setSelectedRecycleItem(item.find((x) => x.id === cell.value));
                  setOpenDeleteModal(true);
                }}>
                <DeleteOutlineIcon />
              </IconButton>
            </Tooltip>
          </div>
        )
      }
    ],

    [item, item.length]
  );

  const {
    getTableProps,

    getTableBodyProps,

    headerGroups,

    rows,

    prepareRow
  } = useTable({ columns, data });

  return (
    <div className={styles.table_container}>
      <table {...getTableProps()} className={styles.table}>
        <thead className={styles.thead}>
          {headerGroups.map((headerGroup, index) => (
            <tr key={`header-${index}`} {...headerGroup.getHeaderGroupProps()}>
              <th>ID</th>
              {headerGroup.headers.map((column, columnIndex) => (
                <th key={`header-${index}-${columnIndex}`} {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()} className={styles.tbody}>
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
        onDelete={handleDeleteRecycleItem}
        name={'ID: ' + selectedRecycleItem.id}
        text="waste transfer card"
      />
    </div>
  );
};
