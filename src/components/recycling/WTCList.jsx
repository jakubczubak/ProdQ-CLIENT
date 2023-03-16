import React from 'react';
import { useTable } from 'react-table';
import { Tooltip, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import styles from './css/WTCList.module.css';

export const WTCList = ({ item, onEdit, onDelete }) => {
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
        Header: 'VALUE PLN',

        accessor: 'value'
      },
      {
        Header: 'ACTION',
        accessor: 'id',
        Cell: ({ cell }) => (
          <div>
            <Tooltip title="Edit">
              <IconButton onClick={() => onEdit(cell.value)}>
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={() => onDelete(cell.value)}>
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
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              <th>ID</th>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()} className={styles.tbody}>
          {rows.map((row, index) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                <td> {index + 1}</td>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
