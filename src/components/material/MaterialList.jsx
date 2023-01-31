import React from 'react';
import { useTable } from 'react-table';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, useMemo } from 'react';
import { materialManager } from './service/materialManager';

export const MaterialList = ({ id }) => {
  const [tableData, setTableData] = useState(null);
  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ['materialList', id],
    queryFn: () => materialManager.fetchMaterialListByMaterialGroupID(id)
  });

  useEffect(() => {
    setTableData(apiResponse);
  }, [apiResponse]);

  if (isLoading || !tableData) {
    return <div>Loading...</div>;
  }

  const [columns, data] = useMemo(() => {
    const columns = [
      {
        Header: 'Thickness (mm)',
        accessor: 'z'
      },
      {
        Header: 'Width (mm)',
        accessor: 'x'
      },
      {
        Header: 'Height (mm)',
        accessor: 'y'
      },
      {
        Header: 'Quantity',
        accessor: 'quantity'
      },
      {
        Header: 'Minimum quantity',
        accessor: 'min_quantity'
      },
      {
        Header: 'Inventory date',
        accessor: 'inventory_date'
      }
    ];
    return [columns, tableData];
  }, [tableData]);

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,

    getTableBodyProps,

    headerGroups,

    rows,

    prepareRow
  } = tableInstance;

  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                key={column.id}
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 3px red',

                  background: 'aliceblue',

                  color: 'black',

                  fontWeight: 'bold'
                }}
              >
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
            <tr key={row.id} {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    key={cell.id}
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',

                      border: 'solid 1px gray',

                      background: 'papayawhip'
                    }}
                  >
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
