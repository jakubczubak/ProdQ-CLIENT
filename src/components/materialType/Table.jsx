import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { IconButton, Tooltip } from '@mui/material';
import { useTable, useSortBy } from 'react-table';
import styles from './css/Table.module.css';
import { useState } from 'react';
import { DeleteModal } from '../common/DeleteModal';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/no-data-animation.json';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { materialTypeManager } from './service/materialTypeManager';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { MaterialTypeModal } from './MaterialTypeModal';

import React from 'react';

export const Table = ({ items }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isOpenMaterialTypeModal, setIsOpenMaterialTypeModal] = useState(false);
  const [selectedRecycleItem, setSelectedRecycleItem] = useState({});

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleDelete = () => {
    materialTypeManager.deleteMaterialType(selectedRecycleItem.id, queryClient, dispatch);
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
        Header: 'MATERIAL TYPE',

        accessor: 'name' // accessor is the "key" in the data
      },
      {
        Header: 'DENSITY (g/cm3)',

        accessor: 'density' // accessor is the "key" in the data
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
                  setSelectedRecycleItem(selectedRecycleItem);
                  setIsOpenMaterialTypeModal(true);
                }}>
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={() => {
                  const selectedRecycleItem = items.find((x) => x.id === cell.value);
                  setSelectedRecycleItem(selectedRecycleItem);
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
        onDelete={handleDelete}
        name={selectedRecycleItem.name}
        text="material type"
      />
      <MaterialTypeModal
        item={selectedRecycleItem}
        open={isOpenMaterialTypeModal}
        onClose={() => setIsOpenMaterialTypeModal(false)}
      />
    </div>
  );
};
