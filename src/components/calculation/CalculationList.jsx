import React from 'react';
import styles from './css/CalculationList.module.css';
import { Tooltip, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { DeleteModal } from '../common/DeleteModal';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/no-data-animation.json';
import { calculationManager } from './service/calculationManager';
import { useTable, useSortBy } from 'react-table';
import { useState } from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export const CalculationList = ({ calculationList }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteItem = () => {
    calculationManager.deleteCalculation(selectedItem.id, queryClient, dispatch);
    setOpenDeleteModal(false);
  };

  const data = React.useMemo(
    () => calculationList,

    [calculationList, calculationList.length]
  );
  const columns = React.useMemo(
    () => [
      {
        Header: 'NAME',

        accessor: 'calculationName' // accessor is the "key" in the data
      },

      {
        Header: 'DATE',

        accessor: 'selectedDate'
      },
      {
        Header: 'PRICE',

        accessor: 'cncOrderValuation',
        Cell: ({ row }) => (
          <Tooltip title="Calculation valuation">
            <div className={styles.success}>{row.original.cncOrderValuation} PLN</div>
          </Tooltip>
        )
      },
      {
        Header: 'STATUS',
        accessor: 'status',
        Cell: ({ row }) => {
          if (row.original.status === 'Pending') {
            return (
              <Tooltip title="Calculation status">
                <div className={styles.status_pending}>{row.original.status}</div>
              </Tooltip>
            );
          } else {
            return (
              <Tooltip title="Calculation status">
                <div className={styles.status_finish}>{row.original.status}</div>
              </Tooltip>
            );
          }
        }
      },
      {
        Header: 'ACTION',
        accessor: 'id',
        Cell: ({ cell }) => (
          <div>
            <Tooltip title="Edit calculation">
              <IconButton
                onClick={() => {
                  const item = calculationList.find((x) => x.id === cell.value);
                  navigate('/calculation/edit/', { state: item });
                }}
              >
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete calculation">
              <IconButton
                onClick={() => {
                  setSelectedItem(calculationList.find((x) => x.id === cell.value));
                  setOpenDeleteModal(true);
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Tooltip>
          </div>
        )
      }
    ],

    [calculationList, calculationList.length]
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
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
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
        name={selectedItem.calculationName}
        text="calculation"
      />
    </div>
  );
};
