/* eslint-disable react/jsx-key */
import React from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import { TableColumn } from './TableColumn';
import { GlobalFilter } from './GlobalFilter';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import styles from './css/MaterialList.module.css';
import Lottie from 'lottie-react';
import animation from '../../assets/Lottie/no-data-animation.json';

export const MaterialList = ({ materialList, type }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = React.useMemo(() => materialList, [materialList.length]);

  const columns = React.useMemo(
    () => TableColumn(type),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [materialList.length]
  );

  const {
    getTableProps,

    getTableBodyProps,

    headerGroups,

    rows,

    prepareRow,

    state,

    setGlobalFilter
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  const { globalFilter } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

      <div className={styles.table_container}>
        <table {...getTableProps()} className={styles.table}>
          <thead className={styles.thead}>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <div>
                      {column.render('Header')}
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ArrowDownwardIcon />
                        ) : (
                          <ArrowUpwardIcon />
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
                <td colSpan={columns.length}>
                  <Lottie animationData={animation} loop={true} className={styles.animation} />
                </td>
              </tr>
            )}

            {rows.map((row) => {
              prepareRow(row);

              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
