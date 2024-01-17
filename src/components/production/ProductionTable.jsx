import React from 'react';
import { Tooltip } from '@mui/material';
import styles from './css/Production.module.css';
import { useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DeleteModal } from '../common/DeleteModal';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { recycleManager } from '../recycling/service/recycleManager';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/no-data-animation.json';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


export const ProductionTable = ({ items}) => {
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
    () => items,

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, items.length]
  );
  const columns = React.useMemo(
    () => [
      {
        Header: 'DATE',

        accessor: 'date' // accessor is the "key" in the data
      },
      {
        Header: 'TYPE',

        accessor: 'wasteType' // accessor is the "key" in the data
      },
      {
        Header: 'VALUE',

        accessor: 'totalPrice',
        Cell: ({ row }) => {
          if (row.original.totalPrice < 0)
            return (
              <Tooltip title="Disposal fee">
                <div className={styles.error}>{row.original.totalPrice} PLN </div>
              </Tooltip>
            );
          else return <div className={styles.success}>{row.original.totalPrice} PLN</div>;
        }
      },
      {
        Header: 'COMPANY',

        accessor: 'company'
      },
      {
        Header: 'ACTION',
        accessor: 'id',
        Cell: ({ cell }) => (
          <div>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => {
                  const selectedRecycleItem = items.find((x) => x.id === cell.value);
                  navigate('/recycling/wtc/', { state: selectedRecycleItem });
                }}>
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={() => {
                  setSelectedRecycleItem(items.find((x) => x.id === cell.value));
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
    [items, items.length]
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
        onDelete={handleDeleteRecycleItem}
        name={selectedRecycleItem.company}
        text="waste transfer card"
      />
    </div>
  );
};
