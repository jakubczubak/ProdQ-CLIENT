// Zewnętrzne importy
import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Lottie from 'lottie-react';

// Lokalne importy
import styles from './css/MaterialList.module.css';
import animation from '../../assets/Lottie/no-data-animation.json';

export const Table = ({
  getTableProps,
  headerGroups,
  getTableBodyProps,
  rows,
  columns,
  prepareRow,
  onEdit
}) => {
  return (
    <table {...getTableProps()} className={styles.table}>
      <thead className={styles.thead}>
        {headerGroups.map((headerGroup) => (
          <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
            <th key="id">ID</th>
            {headerGroup.headers.map((column) => (
              <th key={column.id} {...column.getHeaderProps(column.getSortByToggleProps())}>
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
            <tr key={row.id} {...row.getRowProps()}>
              <td key={index}>{index + 1}</td>
              {row.cells.map((cell, cellIndex) => {
                // Sprawdzamy, czy bieżąca komórka to nie ostatnia komórka w wierszu
                const isNotLastCell = cellIndex !== row.cells.length - 1;
                return (
                  <td
                    key={cellIndex}
                    {...cell.getCellProps()}
                    onDoubleClick={isNotLastCell ? () => onEdit(cell.row.original.id) : undefined}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
