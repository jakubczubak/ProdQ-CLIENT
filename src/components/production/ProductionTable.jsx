import React from 'react';
import { Button, Tooltip } from '@mui/material';
import styles from './css/ProductionTable.module.css';
import { useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DeleteModal } from '../common/DeleteModal';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { productionManager } from './service/productionManager';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/no-data-animation.json';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import { ProductionModal } from './ProductionModal';

export const ProductionTable = ({ items }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProductionItem, setSelectedProductionItem] = useState({});
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleDeleteRecycleItem = () => {
    productionManager.deleteProductionItem(selectedProductionItem.id, queryClient, dispatch);
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
        Header: 'NAME',

        accessor: 'partName' // accessor is the "key" in the data
      },
      {
        Header: 'CREATED ON',

        accessor: 'createdOn' // accessor is the "key" in the data
      },
      {
        Header: 'UPDATED ON',

        accessor: 'updatedOn' // accessor is the "key" in the data
      },
      {
        Header: 'TYPE',

        accessor: 'partType', // accessor is the "key" in the data
        Cell: ({ row }) => {
          if (row.original.partType === 'plate') {
            return (
              <div>
                <Button variant="contained" size="small" color="primary">
                  PLATE
                </Button>
              </div>
            );
          } else if (row.original.partType === 'part') {
            return (
              <div>
                <Button variant="contained" size="small" color="secondary">
                  PART
                </Button>
              </div>
            );
          } else {
            return (
              <div>
                <Button variant="contained" size="small" color="info">
                  MODIFICATION
                </Button>
              </div>
            );
          }
        }
      },
      {
        Header: 'STATUS',

        accessor: 'status', // accessor is the "key" in the data

        Cell: ({ row }) => {
          if (row.original.status === 'inprogress') {
            return (
              <div>
                <Button variant="outlined" size="small" color="warning">
                  IN PROGRESS
                </Button>
              </div>
            );
          } else {
            return (
              <div>
                <Button variant="outlined" size="small" color="success">
                  DONE
                </Button>
              </div>
            );
          }
        }
      },
      {
        Header: 'ACTION',
        accessor: 'id',
        Cell: ({ cell, row }) => (
          <div>
            {row.original.filePDF && (
              <Tooltip title="View PDF">
                <IconButton
                  onClick={() => {
                    console.log('view pdf');
                  }}>
                  <PictureAsPdfOutlinedIcon />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Edit">
              <IconButton
                onClick={() => {
                  setSelectedProductionItem(items.find((x) => x.id === cell.value));
                  setOpen(true);
                }}>
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={() => {
                  setSelectedProductionItem(items.find((x) => x.id === cell.value));
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
        name={selectedProductionItem.partName}
        text="production item"
      />
      <ProductionModal open={open} onClose={() => setOpen(false)} item={selectedProductionItem} />
    </div>
  );
};
