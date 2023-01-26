import React, { useMemo } from 'react';

import MaterialReactTable from 'material-react-table';
import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';

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

        Cell: ({ cell, row }) => (
          <div>
            <Tooltip title="Edit">
              <IconButton>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Info">
              <IconButton>
                <InfoIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            {/* <div>{row.getValue('address')}</div> */}
          </div>
        )
      }
    ],

    []
  );

  return <MaterialReactTable columns={columns} data={data} enableColumnFilters={false} />;
};
