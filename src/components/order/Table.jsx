// Importy zewnętrzne:
import React from 'react';
import Lottie from 'lottie-react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// Importy lokalne:
import animation from '../../assets/Lottie/no-data-animation.json';
import styles from './css/OrderTable.module.css';

export const Table = ({
  getTableBodyProps,
  getTableProps,
  headerGroups,
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

      <tbody {...getTableBodyProps()} className={styles.tbody}>
        {rows.length === 0 ? (
          <tr className={styles.no_data}>
            <td colSpan={columns.length + 1} className={styles.no_data}>
              <Lottie animationData={animation} loop={true} className={styles.animation} />
            </td>
          </tr>
        ) : (
          rows.map((row, rowIndex) => {
            prepareRow(row);
            const { key: rowKey, ...restRowProps } = row.getRowProps();
            return (
              <tr key={rowKey} {...restRowProps}>
                <td key={`id-${rowKey}`}>{rowIndex + 1}</td>
                {row.cells.map((cell) => {
                  const { key: cellKey, ...restCellProps } = cell.getCellProps();
                  const isNotLastCell = cell.column.id !== columns[columns.length - 1].id;
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
