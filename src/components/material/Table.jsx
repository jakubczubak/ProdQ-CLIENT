import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useQuery } from '@tanstack/react-query';
import { materialManager } from './materialManager';

export const Table = ({ id }) => {
  const { data } = useQuery({
    queryKey: ['material', id],
    queryFn: () => materialManager.fetchMaterialByID(id)
  });

  if (data.type == 'Plate') {
    const columns = useMemo(
      () => [
        {
          accessorKey: 'z', //access nested data with dot notation

          header: 'Thickness (mm)'
        },

        {
          accessorKey: 'x',

          header: 'Width (mm)'
        },
        {
          accessorKey: 'y',

          header: 'Height (mm)'
        },

        {
          accessorKey: 'quantity', //normal accessorKey

          header: 'Quantity'
        },

        {
          accessorKey: 'min_quantity',

          header: 'Minimum quantity'
        },

        {
          accessorKey: 'inventory_date',

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
    return (
      <MaterialReactTable columns={columns} data={data.materialList} enableColumnFilters={false} />
    );
  } else if (data.type == 'Tube') {
    const columns = useMemo(
      () => [
        {
          accessorKey: 'd', //access nested data with dot notation

          header: 'Diameter ⌀ (mm)'
        },

        {
          accessorKey: 'g',

          header: 'Thickness (mm)'
        },
        {
          accessorKey: 'l',

          header: 'Length (mm)'
        },

        {
          accessorKey: 'quantity', //normal accessorKey

          header: 'Quantity'
        },

        {
          accessorKey: 'min_quantity',

          header: 'Minimum quantity'
        },

        {
          accessorKey: 'inventory_date',

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
    return (
      <MaterialReactTable columns={columns} data={data.materialList} enableColumnFilters={false} />
    );
  } else {
    const columns = useMemo(
      () => [
        {
          accessorKey: 'diameter', //access nested data with dot notation

          header: 'Diameter ⌀ (mm) '
        },
        {
          accessorKey: 'length',

          header: 'Length (mm)'
        },

        {
          accessorKey: 'quantity', //normal accessorKey

          header: 'Quantity'
        },

        {
          accessorKey: 'min_quantity',

          header: 'Minimum quantity'
        },

        {
          accessorKey: 'inventory_date',

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
    return (
      <MaterialReactTable columns={columns} data={data.materialList} enableColumnFilters={false} />
    );
  }
};
