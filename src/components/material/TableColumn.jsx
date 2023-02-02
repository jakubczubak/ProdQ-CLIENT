import { IconButton, Tooltip } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export const TableColumn = (type) => {
  if (type == 'Plate') {
    return [
      {
        Header: 'THICKNESS (mm)',

        accessor: 'z' // accessor is the "key" in the data
      },

      {
        Header: 'WIDTH (mm)',

        accessor: 'x'
      },

      {
        Header: 'HEIGHT (mm)',

        accessor: 'y'
      },

      {
        Header: 'QUANTITY',

        accessor: 'quantity'
      },

      {
        Header: 'Min. QUANTITY',

        accessor: 'min_quantity'
      },

      {
        Header: 'INVENTORY DATE',

        accessor: 'inventory_date'
      },

      {
        Header: 'ACTION',
        accessor: 'id',
        Cell: ({ cell }) => (
          <div>
            <Tooltip title="Edit">
              <IconButton>
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton>
                <DeleteOutlineIcon />
              </IconButton>
            </Tooltip>
          </div>
        )
      }
    ];
  } else if (type == 'Tube') {
    return [
      {
        Header: 'DIAMETER (mm)',

        accessor: 'diameter' // accessor is the "key" in the data
      },

      {
        Header: 'THICKNESS (mm)',

        accessor: 'thickeness' // accessor is the "key" in the data
      },

      {
        Header: 'LENGTH (mm)',

        accessor: 'length'
      },

      {
        Header: 'QUANTITY',

        accessor: 'quantity'
      },

      {
        Header: 'Min. QUANTITY',

        accessor: 'min_quantity'
      },

      {
        Header: 'INVENTORY DATE',

        accessor: 'inventory_date'
      },

      {
        Header: 'ACTION',
        accessor: 'id',
        Cell: ({ cell }) => (
          <div>
            <Tooltip title="Edit">
              <IconButton>
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton>
                <DeleteOutlineIcon />
              </IconButton>
            </Tooltip>
          </div>
        )
      }
    ];
  } else if (type == 'Rod') {
    return [
      {
        Header: 'DIAMETER (mm)',

        accessor: 'diameter' // accessor is the "key" in the data
      },

      {
        Header: 'LENGTH (mm)',

        accessor: 'length'
      },

      {
        Header: 'QUANTITY',

        accessor: 'quantity'
      },

      {
        Header: 'Min. QUANTITY',

        accessor: 'min_quantity'
      },

      {
        Header: 'INVENTORY DATE',

        accessor: 'inventory_date'
      },

      {
        Header: 'ACTION',
        accessor: 'id',
        Cell: ({ cell }) => (
          <div>
            <Tooltip title="Edit">
              <IconButton>
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton>
                <DeleteOutlineIcon />
              </IconButton>
            </Tooltip>
          </div>
        )
      }
    ];
  }
};
