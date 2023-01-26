import React, { useMemo } from 'react';

import MaterialReactTable from 'material-react-table';
import { TextField } from '@mui/material';

const data = [
  {
    id: 1,
    name: {
      firstName: 'John',

      lastName: 'Doe'
    },

    address: '261 Erdman Ford',

    city: 'East Daphne',

    state: 'Kentucky'
  }
];

export const Table = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name.firstName', //access nested data with dot notation

        header: 'Thicknes'
      },

      {
        accessorKey: 'name.lastName',

        header: 'Dimensions'
      },

      {
        accessorKey: 'address', //normal accessorKey

        header: 'Quantity'
      },

      {
        accessorKey: 'city',

        header: 'Minimum quantity'
      },

      {
        accessorKey: 'state',

        header: 'Inventory date'
      },
      {
        accessorKey: 'id', //access nested data with dot notation
        enableColumnActions: false,
        enableSorting: false,

        header: 'Actions',

        Cell: ({ cell }) => <TextField value={cell.getValue()} />
      }
    ],

    []
  );

  return <MaterialReactTable columns={columns} data={data} enableColumnFilters={false} />;
};
