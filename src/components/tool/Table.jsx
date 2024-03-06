/* eslint-disable react/jsx-key */
import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import styles from './css/ToolList.module.css';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/no-data-animation.json';

export const Table = ({
  getTableBodyProps,
  headerGroups,
  getTableProps,
  rows,
  columns,
  prepareRow
}) => {
  return (
    <table {...getTableProps()} className={styles.table}>
      <thead className={styles.thead}>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            <th>ID</th>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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

      <tbody {...getTableBodyProps()}>
        {rows.length === 0 && (
          <tr className={styles.no_data}>
            <td colSpan={columns.length + 1}>
              <Lottie animationData={animation} loop={true} className={styles.animation} />
            </td>
          </tr>
        )}

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
  );
};
