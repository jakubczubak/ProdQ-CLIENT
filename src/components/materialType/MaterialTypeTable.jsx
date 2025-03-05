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
          <tr key={index} {...headerGroup.getHeaderGroupProps()}>
            <th>ID</th>
            {headerGroup.headers.map((column, columnIndex) => {
              const { key, ...restColumnProps } = column.getHeaderProps(column.getSortByToggleProps());
              return (
                <th
                  key={key} // Pass key directly
                  {...restColumnProps} // Spread the rest of the props
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
              );
            })}
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
          const { key, ...restRowProps } = row.getRowProps(); // Extract key and rest props
          return (
            <tr key={key} {...restRowProps}> {/* Pass key directly */}
              <td>{rowIndex + 1}</td>
              {row.cells.map((cell, cellIndex) => {
                const { key: cellKey, ...restCellProps } = cell.getCellProps(); // Extract key and rest props
                return (
                  <td key={cellKey} {...restCellProps}> {/* Pass key directly */}
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
