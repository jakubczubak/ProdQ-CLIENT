import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Lottie from 'lottie-react';
import styles from './css/ToolList.module.css';
import animation from '../../assets/Lottie/no-data-animation.json';

export const Table = ({
  getTableBodyProps,
  headerGroups,
  getTableProps,
  rows,
  columns,
  prepareRow,
  onEdit
}) => {
  return (
    <table {...getTableProps()} className={styles.table}>
      <thead className={styles.thead}>
        {headerGroups.map((headerGroup) => {
          const { key: headerKey, ...restHeaderProps } = headerGroup.getHeaderGroupProps();
          return (
            <tr key={headerKey} {...restHeaderProps}>
              <th>ID</th>
              {headerGroup.headers.map((column) => {
                const { key: columnKey, ...restColumnProps } = column.getHeaderProps(
                  column.getSortByToggleProps()
                );
                return (
                  <th key={columnKey} {...restColumnProps}>
                    <div className={styles.sort}>
                      {column.render('Header')}
                      {column.isSorted &&
                        (column.isSortedDesc ? (
                          <ArrowDownwardIcon fontSize="inherit" />
                        ) : (
                          <ArrowUpwardIcon fontSize="inherit" />
                        ))}
                    </div>
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.length === 0 ? (
          <tr className={styles.no_data}>
            <td colSpan={columns.length + 1}>
              <Lottie animationData={animation} loop={true} className={styles.animation} />
            </td>
          </tr>
        ) : (
          rows.map((row, index) => {
            prepareRow(row);
            const { key: rowKey, ...restRowProps } = row.getRowProps();
            return (
              <tr key={rowKey} {...restRowProps}>
                <td key={`id-${rowKey}`}>{index + 1}</td>
                {row.cells.map((cell, cellIndex) => {
                  const { key: cellKey, ...restCellProps } = cell.getCellProps();
                  const isNotLastCell = cellIndex !== row.cells.length - 1;
                  return (
                    <td
                      key={cellKey}
                      {...restCellProps}
                      onDoubleClick={
                        isNotLastCell ? () => onEdit(cell.row.original.id) : undefined
                      }>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};
