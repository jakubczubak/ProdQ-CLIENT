/* eslint-disable react/jsx-key */
import React from 'react';
import { useTable } from 'react-table';
import { tableColumn, useGlobalFilter, useAsyncDebounce, useSortBy } from './service/tableColumn';

export const MaterialList = ({ materialList, type }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = React.useMemo(() => materialList, [materialList.length]);

  const columns = React.useMemo(
    () => tableColumn(type),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [materialList.length]
  );

  const {
    getTableProps,

    getTableBodyProps,

    headerGroups,

    rows,

    prepareRow
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 3px red',

                  background: 'aliceblue',

                  color: 'black',

                  fontWeight: 'bold'
                }}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);

          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',

                      border: 'solid 1px gray',

                      background: 'papayawhip'
                    }}>
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
