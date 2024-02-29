//Importy zewnętrzne
import Lottie from 'lottie-react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
//Importy lokalne
import styles from './css/Table.module.css';
import animation from '../../assets/Lottie/no-data-animation.json';

export const MaterialTypeTable = ({
  getTableBodyProps,
  getTableProps,
  headerGroups,
  rows,
  columns,
  prepareRow
}) => {
  return (
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
  );
};
